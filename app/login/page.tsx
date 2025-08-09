'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [passord, setPassord] = useState('');
  const [feil, setFeil] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeil('');

    const res = await fetch('http://localhost:1337/api/auth/local', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: email, password: passord }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('jwt', data.jwt);
      router.push('/');
    } else {
      setFeil(data.error?.message || 'Innlogging feilet');
    }
  };

  return (
    <div>
      <h1>Logg inn</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 400 }}>
        <input
          type="email"
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Passord"
          value={passord}
          onChange={(e) => setPassord(e.target.value)}
          required
        />
        <button type="submit">Logg inn</button>
        {feil && <p style={{ color: 'red' }}>{feil}</p>}
      </form>
    </div>
  );
}
