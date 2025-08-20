import Link from "next/link";

type Artikkel = { id: number; tittel: string };

async function hentArtikler(): Promise<Artikkel[]> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  console.log("[spegel] NEXT_PUBLIC_STRAPI_URL =", apiUrl);

  if (!apiUrl) return [];

  try {
    const res = await fetch(`${apiUrl}/api/artikkels`, { cache: "no-store" });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[spegel] /artikler fetch feilet:", res.status, body);
      return [];
    }
    const json = await res.json();
    return json?.data ?? [];
  } catch (e) {
    console.error("[spegel] /artikler uventet feil:", e);
    return [];
  }
}

export default async function ArtiklerPage() {
  const artikler = await hentArtikler();

  return (
    <main style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Artikler</h1>
      {artikler.length === 0 && (
        <p style={{ opacity: 0.7 }}>
          Ingen artikler å vise. (Sjekk backend/ENV.)
        </p>
      )}
      {artikler.map((a: any) => (
        <div key={a.id} style={{ marginBottom: "1rem" }}>
          <Link href={`/artikkel/${a.id}`} style={{ color: "blue" }}>
            {a.tittel}
          </Link>
        </div>
      ))}
    </main>
  );
}
