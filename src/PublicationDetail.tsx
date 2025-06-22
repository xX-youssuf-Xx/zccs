import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

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

export default function PublicationDetail() {
  const { id } = useParams();
  const [pub, setPub] = useState<Publication | null>(null);
  useEffect(() => {
    if (id) {
      getDoc(doc(db, 'publications', id)).then(docSnap => {
        if (docSnap.exists()) setPub({ id: docSnap.id, ...docSnap.data() } as Publication);
      });
    }
  }, [id]);
  if (!pub) return <div>Loading...</div>;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <h1 style={{ margin: 0, fontSize: 32 }}>{pub.title}</h1>
        <span style={{ fontSize: 16, color: '#888', marginLeft: 16 }}>{formatDate(pub.createdAt)}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: pub.content }} />
    </div>
  );
} 