import Link from "next/link";

type Artikkel = { id: number; tittel: string };


async function hentArtikler(): Promise<Artikkel[]> {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  // Logg hvilke miljøvariabler vi faktisk får (server-logg i Vercel)
  console.log("[spegel] NEXT_PUBLIC_STRAPI_URL =", apiUrl);

  if (!apiUrl) {
    console.error("[spegel] Mangler NEXT_PUBLIC_STRAPI_URL");
    return [];
  }

  try {
    const res = await fetch(`${apiUrl}/api/artikkels`, {
      // ingen caching, og tål sove/vekke på Render
      cache: "no-store",
      // @ts-ignore  (Next 15: valgfritt å disable)
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      console.error("[spegel] Fetch feilet", res.status, txt);
      return [];
    }

    const json = await res.json();
    // Logg antall artikler
    console.log("[spegel] Antall artikler:", json?.data?.length);
    return json?.data ?? [];
  } catch (err) {
    console.error("[spegel] Uventet feil ved henting:", err);
    return [];
  }
}

export default async function Home() {
  const artikler = await hentArtikler();

  return (
    <main style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Artikler</h1>

      {artikler.length === 0 && (
        <p style={{ opacity: 0.7 }}>
          Ingen artikler å vise. Sjekk at backend er oppe og at{" "}
          <code>NEXT_PUBLIC_STRAPI_URL</code> er riktig satt i Vercel.
        </p>
      )}

      {artikler.map((artikkel: any) => {
        const { id, tittel } = artikkel;
        return (
          <div key={id} style={{ marginBottom: "1rem" }}>
            <Link href={`/artikkel/${id}`} style={{ color: "blue", fontSize: "1.2rem" }}>
              {tittel}
            </Link>
          </div>
        );
      })}
    </main>
  );
}
