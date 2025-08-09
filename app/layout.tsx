// app/layout.tsx
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'ArtikkelApp',
  description: 'Neste generasjons redigerbar webside',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body>
        <nav style={{ background: '#333', padding: '1rem' }}>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem', color: '#fff' }}>
            <li><Link href="/" style={{ color: '#fff' }}>Hjem</Link></li>
            <li><Link href="/artikler" style={{ color: '#fff' }}>Artikler</Link></li>
            <li><Link href="/ny" style={{ color: '#fff' }}>Ny artikkel</Link></li>
            <li><Link href="/login" style={{ color: '#fff' }}>Logg inn</Link></li>
            <li><Link href="/logout" style={{ color: '#fff' }}>Logg ut</Link></li>
          </ul>
        </nav>
        <main style={{ padding: '2rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
