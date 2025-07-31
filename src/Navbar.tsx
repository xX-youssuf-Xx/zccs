import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav style={{
      width: '100%',
      background: '#fff',
      borderBottom: '1px solid #f2f2f2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 64,
      position: 'sticky',
      top: 0,
      zIndex: 100,
      fontFamily: 'Inter, Noto Sans, Arial, sans-serif',
      fontSize: 20,
      fontWeight: 500,
      color: '#111',
      padding: '0 40px',
      boxSizing: 'border-box',
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 14, paddingLeft: 8, textDecoration: 'none' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
          <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <span style={{ fontWeight: 900, fontSize: 24, color: '#111', letterSpacing: '-0.02em', fontFamily: 'Inter, Noto Sans, Arial, sans-serif' }}>ZCCS</span>
      </Link>

      {/* Mobile menu button */}
      <button 
        className="menu-button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          padding: 8,
          cursor: 'pointer',
        }}
      >
        <div style={{ width: 24, height: 2, background: '#111', marginBottom: 6 }} />
        <div style={{ width: 24, height: 2, background: '#111', marginBottom: 6 }} />
        <div style={{ width: 24, height: 2, background: '#111' }} />
      </button>

      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <Link to="/" style={{ color: '#111', textDecoration: 'none', fontWeight: 500, fontSize: 18, fontFamily: 'inherit' }}>Home</Link>
        <Link to="/about" style={{ color: '#111', textDecoration: 'none', fontWeight: 500, fontSize: 18, fontFamily: 'inherit' }}>About</Link>
        <Link to="/team" style={{ color: '#111', textDecoration: 'none', fontWeight: 500, fontSize: 18, fontFamily: 'inherit' }}>Team</Link>
        <Link to="/blog" style={{ color: '#111', textDecoration: 'none', fontWeight: 500, fontSize: 18, fontFamily: 'inherit' }}>Blog</Link>
        <Link to="/publications" style={{ color: '#111', textDecoration: 'none', fontWeight: 500, fontSize: 18, fontFamily: 'inherit' }}>Publications</Link>
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            .menu-button {
              display: block !important;
            }
            .nav-links {
              display: none !important;
              position: absolute !important;
              top: 64px;
              left: 0;
              right: 0;
              background: #fff;
              flex-direction: column !important;
              padding: 20px;
              gap: 20px !important;
              border-bottom: 1px solid #f2f2f2;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            .nav-links.open {
              display: flex !important;
            }
            nav {
              padding: 0 20px !important;
            }
          }
        `}
      </style>
    </nav>
  );
}