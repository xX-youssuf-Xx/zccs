import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      width: '100%',
      background: '#fff',
      borderBottom: '1px solid #e0e0e0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      height: 64,
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width:70, height:70, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 22 }}>
          <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <span style={{ fontWeight: 700, fontSize: 22, color: '#222', marginLeft: 8 }}>ZCCS Club</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <Link to="/" style={{ color: '#646cff', textDecoration: 'none', fontWeight: 500, fontSize: 18 }}>Home</Link>
        <Link to="/about" style={{ color: '#646cff', textDecoration: 'none', fontWeight: 500, fontSize: 18 }}>About</Link>
        <Link to="/team" style={{ color: '#646cff', textDecoration: 'none', fontWeight: 500, fontSize: 18 }}>Team</Link>
        <Link to="/blog" style={{ color: '#646cff', textDecoration: 'none', fontWeight: 500, fontSize: 18 }}>Blog</Link>
        <Link to="/publications" style={{ color: '#646cff', textDecoration: 'none', fontWeight: 500, fontSize: 18 }}>Publications</Link>
      </div>
    </nav>
  );
} 