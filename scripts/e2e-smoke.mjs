/**
 * Smoke e2e MyFood — Playwright (Chromium).
 * Pré-requisitos: site em E2E_BASE_URL e API em E2E_API_URL.
 * Dependência: `npm install -D playwright` (ou CI instala).
 */
let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error(
    "Pacote playwright não encontrado. Rode: npm install -D playwright && npx playwright install chromium",
  );
  process.exit(1);
}

const BASE = process.env.E2E_BASE_URL || "http://127.0.0.1:5500";
const API = process.env.E2E_API_URL || "http://127.0.0.1:3333/api";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const health = await fetch(`${API}/health`);
assert(health.ok, `API health falhou: ${health.status}`);

async function launchBrowser() {
  const preferred = process.env.E2E_CHANNEL;
  if (preferred) {
    return chromium.launch({ headless: true, channel: preferred });
  }
  try {
    return await chromium.launch({ headless: true });
  } catch {
    // Fallback: Chrome/Edge do sistema (sem download do browser Playwright)
    try {
      return await chromium.launch({ headless: true, channel: "chrome" });
    } catch {
      return chromium.launch({ headless: true, channel: "msedge" });
    }
  }
}

const browser = await launchBrowser();
const page = await browser.newPage();

try {
  await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 60_000 });

  const title = await page.title();
  assert(title.includes("MyFood"), `Title inesperado: ${title}`);

  const h1 = await page.locator("h1").first().textContent();
  assert(
    (h1 || "").replace(/\s/g, "").includes("MyFood"),
    `H1 inesperado: ${h1}`,
  );

  assert(
    (await page.locator(".mf-hero.mf-hero-first").count()) > 0,
    "Hero de marca ausente no first viewport",
  );

  await page.waitForFunction(() => {
    const nodes = document.querySelectorAll(
      ".mf-grid-cards h3, .mf-grid-cards .mf-title",
    );
    return nodes.length >= 3;
  }, { timeout: 20_000 });

  const restaurantName = await page
    .locator(".mf-grid-cards h3, .mf-grid-cards .mf-title")
    .first()
    .textContent();
  assert(
    (restaurantName || "").trim().length > 0,
    "Nenhum restaurante listado",
  );

  await page.locator('a[href*="buscar"]').first().click();
  await page.waitForTimeout(800);
  const url = page.url();
  assert(/buscar/.test(url), `Não navegou para buscar: ${url}`);

  console.log(
    JSON.stringify(
      {
        ok: true,
        title,
        restaurant: (restaurantName || "").trim(),
        url,
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
