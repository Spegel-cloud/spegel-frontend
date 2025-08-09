import ReactMarkdown from "react-markdown";

async function hentArtikler() {
  const res = await fetch("http://localhost:1337/api/artikkels", {
    cache: "no-store",
  });

  const data = await res.json();
  return data.data;
}

export default async function ArtiklerPage() {
  const artikler = await hentArtikler();

  return (
    <main style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Alle artiklene:</h1>

      {artikler.map((artikkel: any) => {
        const { id, tittel, innhold } = artikkel;

        return (
          <div key={id} style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem" }}>{tittel}</h2>
            <ReactMarkdown>{innhold}</ReactMarkdown>
            <hr style={{ marginTop: "1rem" }} />
          </div>
        );
      })}
    </main>
  );
}
