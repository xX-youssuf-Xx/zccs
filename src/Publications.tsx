import { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Publication {
  id: string;
  title: string;
  viewUrl: string;
  downloadUrl: string;
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
  useEffect(() => {
    getDocs(collection(db, 'publications')).then(snapshot => {
      setPublications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Publication));
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '32px 0', boxSizing: 'border-box' }}>
      {publications.map(pub => (
        <div
          key={pub.id}
          style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 8px #0001',
            padding: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid #f0f0f0',
            maxWidth: 700,
            width: '100%',
            margin: '0 auto 16px auto', // Center and space out
            boxSizing: 'border-box',
          }}
        >
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#222', margin: 0 }}>{pub.title}</h3>
            <span style={{ fontSize: 14, color: '#888' }}>{formatDate(pub.createdAt)}</span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href={pub.viewUrl} target="_blank" rel="noopener noreferrer">
              <button style={{ background: '#646cff', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 16px', fontWeight: 600, cursor: 'pointer' }}>
                View
              </button>
            </a>
            <a href={pub.downloadUrl} target="_blank" rel="noopener noreferrer" download>
              <button style={{ background: '#2ecc40', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 16px', fontWeight: 600, cursor: 'pointer' }}>
                Download
              </button>
            </a>
          </div>
        </div>
      ))}
      <style>
        {`
          @media (max-width: 800px) {
            .publication-card {
              max-width: 98vw !important;
              flex-direction: column !important;
              padding: 16px !important;
            }
          }
        `}
      </style>
    </div>
  );
}