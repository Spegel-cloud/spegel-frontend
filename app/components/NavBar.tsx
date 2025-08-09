'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function NavBar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <nav style={{ background: '#333', color: '#fff', padding: '1rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <Link href="/" className={pathname === '/' ? 'active-link' : 'nav-link'}>
        Hjem
      </Link>

      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setOpenDropdown(!openDropdown)}
          className="nav-link"
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
        >
          Artikler ▾
        </button>
        {openDropdown && (
          <div
            style={{
              position: 'absolute',
              top: '2.5rem',
              background: '#444',
              padding: '0.5rem',
              borderRadius: '4px',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Link href="/" className="dropdown-link" onClick={() => setOpenDropdown(false)}>📄 Liste</Link>
            <Link href="/ny" className="dropdown-link" onClick={() => setOpenDropdown(false)}>➕ Ny artikkel</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
