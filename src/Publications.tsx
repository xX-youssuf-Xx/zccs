import { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

interface Publication {
  id: string;
  title: string;
  content: string;
  images: string[];
  createdAt?: { seconds: number } | string;
}

function formatDate(createdAt: Publication['createdAt']) {
  if (!createdAt) return 'N/A';
  let date: Date;
  if (typeof createdAt === 'string') date = new Date(createdAt);
  else if (createdAt.seconds) date = new Date(createdAt.seconds * 1000);
  else return 'N/A';
  return date.toLocaleDateString();
}

export default function Publications() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    getDocs(collection(db, 'publications')).then(snapshot => {
      setPublications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Publication));
    });
  }, []);

  function getPreviewText(html: string, maxLength = 180) {
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent || div.innerText || '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {publications.map(pub => (
        <div
          key={pub.id}
          style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 24, width: '100%', maxWidth: '100%', minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative', cursor: 'pointer', transition: 'box-shadow 0.2s', border: '1px solid #f0f0f0' }}
          onClick={() => navigate(`/publications/${pub.id}`)}
        >
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <h3 style={{ fontSize: 26, fontWeight: 700, color: '#222', flex: 1, margin: 0 }}>{pub.title}</h3>
            <span style={{ fontSize: 15, color: '#888', marginLeft: 12 }}>{formatDate(pub.createdAt)}</span>
          </div>
          <div style={{ color: '#444', fontSize: 18, margin: '12px 0 0 0', width: '100%', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', position: 'relative' }}>
            <span style={{ background: 'linear-gradient(to right, #444 60%, #fff0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{getPreviewText(pub.content)}</span>
          </div>
        </div>
      ))}
    </div>
  );
} 