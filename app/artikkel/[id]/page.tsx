// app/artikkel/[id]/page.tsx

export default async function ArtikkelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Artikkel {id}</h1>
      <p>
        Dette er en dynamisk side for artikkel med ID: <strong>{id}</strong>.
      </p>
    </main>
  );
}
