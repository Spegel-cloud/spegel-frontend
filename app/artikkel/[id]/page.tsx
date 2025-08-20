import React from "react";

// Typing av props: params er alltid et objekt, ikke et Promise
type PageProps = {
  params: {
    id: string;
  };
};

export default function ArtikkelPage({ params }: PageProps) {
  const { id } = params;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Artikkel {id}</h1>
      <p>
        Dette er en dynamisk side for artikkel med ID: <strong>{id}</strong>.
      </p>
    </main>
  );
}
