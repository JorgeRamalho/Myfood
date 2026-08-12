const base = "http://127.0.0.1:3333/api";

async function get(path) {
  const res = await fetch(`${base}${path}`);
  const json = await res.json();
  if (!res.ok) throw new Error(`${path} → ${res.status}`);
  return json.data;
}

const featured = await get("/restaurants/featured");
const menu = await get("/restaurants/tavola-guaira/menu");
const guestRes = await fetch(`${base}/auth/guest`, { method: "POST" });
const guest = (await guestRes.json()).data;

console.log(
  JSON.stringify(
    {
      featuredCount: featured.length,
      firstFeatured: featured[0]?.id,
      menuCount: menu.length,
      guest: guest?.user?.id,
    },
    null,
    2,
  ),
);
