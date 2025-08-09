import Link from "next/link";

async function hentArtikler() {
  const res = await fetch("http://localhost:1337/api/artikkels", {
    cache: "no-store",
  });

  const data = await res.json();
  return data.data;
}

export default async function Home() {
  const artikler = await hentArtikler();

  return (
    <main style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Artikler</h1>

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
