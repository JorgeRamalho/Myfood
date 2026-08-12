import { Suspense } from "react";
import { SearchView } from "./SearchView";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-3 py-6" aria-busy="true">
          <div className="h-8 w-32 rounded-xl bg-white/80" />
          <div className="h-12 rounded-2xl bg-white/80" />
          <p className="mf-caption">Carregando busca...</p>
        </div>
      }
    >
      <SearchView />
    </Suspense>
  );
}
