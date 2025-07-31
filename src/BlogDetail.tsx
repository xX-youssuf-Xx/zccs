import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  images: string[];
  createdAt?: { seconds: number } | string;
}

function formatDate(createdAt: BlogPost["createdAt"]) {
  if (!createdAt) return "N/A";
  let date: Date;
  if (typeof createdAt === "string") date = new Date(createdAt);
  else if (createdAt.seconds) date = new Date(createdAt.seconds * 1000);
  else return "N/A";
  return date.toLocaleDateString();
}

export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  useEffect(() => {
    if (id) {
      getDoc(doc(db, "blog", id)).then((docSnap) => {
        if (docSnap.exists())
          setPost({ id: docSnap.id, ...docSnap.data() } as BlogPost);
      });
    }
  }, [id]);
  if (!post) return <div>Loading...</div>;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
        <h1 style={{ margin: 0, fontSize: 32 }}>{post.title}</h1>
        <span style={{ fontSize: 16, color: "#888", marginLeft: 16 }}>
          {formatDate(post.createdAt)}
        </span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
