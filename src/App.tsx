import { Routes, Route } from 'react-router-dom';
import './App.css'
import Blog from './Blog';
import BlogDetail from './BlogDetail';
import Publications from './Publications';
import PublicationDetail from './PublicationDetail';
import AdminDashboard from './AdminDashboard';
import Home from './Home';
import About from './About';
import Team from './Team';
import Navbar from './Navbar';
import Footer from './Footer';

function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, width: '100%', maxWidth: 900, margin: '0 auto', padding: '2rem 1rem', boxSizing: 'border-box' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/publications/:id" element={<PublicationDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App
