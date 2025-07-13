import { Link } from 'react-router-dom';

export default function Navbar() {
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
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingLeft: 8 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
          <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <span style={{ fontWeight: 900, fontSize: 24, color: '#111', letterSpacing: '-0.02em', fontFamily: 'Inter, Noto Sans, Arial, sans-serif' }}>ZCCS</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <Link to="/" style={{ color: '#111', textDecoration: 'none', fontWeight: 500, fontSize: 18, fontFamily: 'inherit' }}>Home</Link>
        <Link to="/about" style={{ color: '#111', textDecoration: 'none', fontWeight: 500, fontSize: 18, fontFamily: 'inherit' }}>About</Link>
        <Link to="/team" style={{ color: '#111', textDecoration: 'none', fontWeight: 500, fontSize: 18, fontFamily: 'inherit' }}>Team</Link>
        <Link to="/blog" style={{ color: '#111', textDecoration: 'none', fontWeight: 500, fontSize: 18, fontFamily: 'inherit' }}>Blog</Link>
        <Link to="/publications" style={{ color: '#111', textDecoration: 'none', fontWeight: 500, fontSize: 18, fontFamily: 'inherit' }}>Publications</Link>
      </div>
    </nav>
  );
} 