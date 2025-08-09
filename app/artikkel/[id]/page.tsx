import ReactMarkdown from "react-markdown";

async function hentArtikkel(id: string) {
  const res = await fetch(`http://localhost:1337/api/artikkels`, {
    cache: "no-store",
  });

  const data = await res.json();

  // Finn artikkelen med riktig ID
  const artikkel = data.data.find((a: any) => String(a.id) === id);

  return artikkel;
}

export default async function ArtikkelDetalj({ params }: { params: { id: string } }) {
  const artikkel = await hentArtikkel(params.id);

  if (!artikkel) {
    return <p>Fant ikke artikkelen</p>;
  }

  return (
    <main style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>{artikkel.tittel}</h1>
      <ReactMarkdown>{artikkel.innhold}</ReactMarkdown>
    </main>
  );
}
