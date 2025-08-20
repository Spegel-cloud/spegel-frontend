export default async function ArtikkelPage({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL!;
  const res = await fetch(`${apiUrl}/api/artikkels/${id}`, { cache: "no-store" });
  const json = res.ok ? await res.json() : null;

  // …render json?.data
  return <main style={{ padding: "2rem" }}>Artikkel {id}</main>;
}
