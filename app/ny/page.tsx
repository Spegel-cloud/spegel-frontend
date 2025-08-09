'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NyArtikkel() {
  const [tittel, setTittel] = useState('');
  const [innhold, setInnhold] = useState('');
  const [klar, setKlar] = useState(false);
  const [feilmelding, setFeilmelding] = useState('');
  const [suksess, setSuksess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      router.push('/login');
    } else {
      setKlar(true);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeilmelding('');
    setSuksess(false);

    const jwt = localStorage.getItem('jwt');

    const res = await fetch('http://localhost:1337/api/artikkels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        data: {
          tittel,
          innhold,
        },
      }),
    });

    if (res.ok) {
      setSuksess(true);
      setTittel('');
      setInnhold('');
    } else {
      const errorData = await res.json();
      setFeilmelding(errorData.error?.message || 'Noe gikk galt ved innsending.');
    }
  };

  if (!klar) return null; // Ikke vis skjema før autentisering er bekreftet

  return (
    <div>
      <h1>Ny artikkel</h1>
 
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 600 }}>
        <input
          type="text"
          placeholder="Tittel"
          value={tittel}
          onChange={(e) => setTittel(e.target.value)}
          required
        />
        <textarea
          placeholder="Innhold (Markdown støttet)"
          value={innhold}
          onChange={(e) => setInnhold(e.target.value)}
          rows={10}
          required
        />
        <button type="submit">Lagre</button>
      </form>

      {suksess && <p style={{ color: 'green' }}>✅ Artikkel lagret!</p>}
      {feilmelding && <p style={{ color: 'red' }}>❌ {feilmelding}</p>}
    </div>
  );
}
