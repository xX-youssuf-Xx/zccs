import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  limit,
} from "firebase/firestore";
import { app } from "./firebase"; // adjust path based on your project

import "./index.css";

export default function Home() {
  const db = getFirestore(app);

  type Publication = {
    id: string;
    title?: string;
    summary?: string;
    link?: string;
  };
  type Blog = { id: string; title?: string; summary?: string; link?: string };

  const [publications, setPublications] = useState<Publication[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchPublications = async () => {
      const q = query(collection(db, "publications"), limit(3));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPublications(items);
    };

    const fetchBlogs = async () => {
      const q = query(collection(db, "blog"), limit(3));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBlogs(items);
    };

    fetchPublications();
    fetchBlogs();
  }, [db]);

  const [showPublications, setShowPublications] = useState(false);
  const [showBlogs, setShowBlogs] = useState(false);

  return (
    <div className="zccs-home-root">
      <div className="zccs-layout-container">
        <div className="zccs-main-content">
          <div className="zccs-content-container">
            <div className="zccs-hero">
              <div className="zccs-hero-bg">
                <div className="zccs-hero-texts">
                  <h1>Igniting Minds, Shaping the Future</h1>
                  <h2>
                    Zewail City Computer Science Club (ZCCS) is a hub for
                    computer science, math, AI, and research enthusiasts. Join
                    us to explore, learn, and innovate.
                  </h2>
                </div>
                <button className="zccs-explore-btn">
                  <span>Explore</span>
                </button>
              </div>
            </div>
            <h2 className="zccs-section-title">About Us</h2>
            <p className="zccs-section-desc">
              ZCCS is a vibrant community dedicated to fostering a deep
              understanding of computer science, mathematics, and artificial
              intelligence. We provide a platform for students to engage with
              cutting-edge research, collaborate on projects, and expand their
              knowledge through workshops, seminars, and discussions.
            </p>
            <div className="zccs-resources-section">
              <div className="zccs-resources-header">
                <h1>Explore Our Resources</h1>
                <p>
                  Dive into our publications and blogs to discover the latest
                  research and insights from our community.
                </p>
                <button className="zccs-viewall-btn">
                  <span>View All</span>
                </button>
              </div>
              <div className="zccs-resource-cards">
                <div className="zccs-resource-card">
                  <div
                    className="zccs-resource-img"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD4lpjhcwiIrZ0DW9r9QImZIxfi5T8xX5gcpQFYvUX6aKUWGeXQ2YJgknkW2BYm5y8qD2Y5WByAAYT-VJ5udzP1a2aSb7sXNmcfqicH6sSCHRlDIu0GdDYN2cEfcYjzEegcxJlet5PjGixD4XIVR5Wd9CSPs5-R4Or_hYuUw-BuwVIvCl2qfcS7GO79woVuNHqA9Te0-fJKdMCr_zaKVTHbwb1QNLEd4djlpXuWnAS-JkfvOtO9YoFdjcft7KsyKQxUS-U3IL69Hl0")',
                    }}
                  ></div>
                  <div>
                    <p className="zccs-resource-title">Publications</p>
                    <p className="zccs-resource-desc">
                      Access our collection of research papers and articles.
                    </p>
                  </div>
                </div>
                <div className="zccs-resource-card">
                  <div
                    className="zccs-resource-img"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCTd7pXS2iCA15eRUeT6T8HB2tGFpSQ_N4EG37_GkuJrrcivWwXTXW2pu4xiAiPM5VXGGL2XJm8Js-usjFqZQVrwz0zjui2c8WN9ZafymXnOBrzIeh57VmObysfUv3WfOekvmKYbVwjQ_in36vBOoms00iTBfpiOe-p3FUsTxtGSMR9BJ9RWwnn7LHlSowzFQ0oQtBA2VsMy3rwYaFIi9Elg0CE-ldMND35VXyua6mT7_50eDGo1I9HC55oAs-02MfQA8dW_luVIG4")',
                    }}
                  ></div>
                  <div>
                    <p className="zccs-resource-title">Blogs</p>
                    <p className="zccs-resource-desc">
                      Read our latest blog posts on various topics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="zccs-bottom-btns">
              <button className="zccs-bottom-btn zccs-bottom-btn-black" onClick={() => window.location.href = '/publications'}>
                <span>Publications</span>
              </button>
              <button className="zccs-bottom-btn zccs-bottom-btn-light" onClick={() => window.location.href = '/blog'}>
                <span>Blogs</span>
              </button>
            </div> */}

            <div className="zccs-dropdown-buttons">
              <div className="dropdown-section">
                <button
                  className="dropdown-btn"
                  onClick={() => setShowPublications(!showPublications)}
                >
                  Publications ▼
                </button>

                <div
                  className={`dropdown-content-wrapper ${
                    showPublications ? "show" : ""
                  }`}
                >
                  <div className="dropdown-content">
                    {publications.map((item, index) => (
                      <div key={index} className="dropdown-item">
                        <strong>{item.title}</strong>
                        <p>{item.summary}</p>
                        <a href={item.link}>Read more</a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="dropdown-section">
                <button
                  className="dropdown-btn"
                  onClick={() => setShowBlogs(!showBlogs)}
                >
                  Blogs ▼
                </button>

                <div
                  className={`dropdown-content-wrapper ${
                    showBlogs ? "show" : ""
                  }`}
                >
                  <div className="dropdown-content">
                    {blogs.map((item, index) => (
                      <div key={index} className="dropdown-item">
                        <strong>{item.title}</strong>
                        <p>{item.summary}</p>
                        <a href={item.link}>Read more</a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .zccs-home-root {
          min-height: 100vh;
          background: #fff;
          font-family: Inter, 'Noto Sans', sans-serif;
          display: flex;
          flex-direction: column;
        }
        .zccs-layout-container {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .zccs-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #f2f2f2;
          padding: 16px 40px;
          background: #fff;
        }
        .zccs-header-left {
          display: flex;
          align-items: center;
          gap: 16px;
          color: #141414;
        }
        .zccs-logo-svg {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .zccs-header-title {
          font-size: 1.25rem;
          font-weight: bold;
          letter-spacing: -0.015em;
          margin: 0;
        }
        .zccs-header-right {
          display: flex;
          flex: 1;
          justify-content: flex-end;
          gap: 32px;
          align-items: center;
        }
        .zccs-header-links {
          display: flex;
          gap: 36px;
        }
        .zccs-header-links a {
          color: #141414;
          font-size: 1rem;
          font-weight: 500;
          text-decoration: none;
        }
        .zccs-join-btn {
          min-width: 84px;
          max-width: 480px;
          height: 40px;
          padding: 0 16px;
          background: #f2f2f2;
          color: #141414;
          font-size: 1rem;
          font-weight: bold;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .zccs-main-content {
          display: flex;
          flex: 1;
          justify-content: center;
          padding: 40px 0;
        }
        .zccs-content-container {
          max-width: 960px;
          width: 100%;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .zccs-hero {
          margin-bottom: 32px;
        }
        .zccs-hero-bg {
          min-height: 480px;
          background: linear-gradient(rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCbU7WWV0ZzGyivKR6tDlrMArYd1rmanmHUfSCV-LklH-OI6FlC_sSjTlTZMOgoVpyvCoKWLjN92LkDwOnMM9RfuqRMiXaeyYsd8kMn9U-KuPmWwKBdIF-6aSiD7JGLM_S4-eVLauEIrOSciq5FZVXDOdsF2VJatn9CthjscPyg3-z8A1Ftrw0BkCmiqH9dKOemfmjdwmxHOgucWXMAua1VT9RMqn9p7NVv4PsHtEjBFdw8aatGNpa9-Lz-l6ZDk16ld21CdPsvs-g');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border-radius: 18px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          gap: 24px;
          padding: 0 40px 40px 40px;
        }
        .zccs-hero-texts h1 {
          color: #fff;
          font-size: 2.5rem;
          font-weight: 900;
          margin: 0 0 8px 0;
          letter-spacing: -0.033em;
        }
        .zccs-hero-texts h2 {
          color: #fff;
          font-size: 1.1rem;
          font-weight: 400;
          margin: 0;
        }
        .zccs-explore-btn {
          min-width: 84px;
          max-width: 480px;
          height: 40px;
          padding: 0 16px;
          background: #000;
          color: #fff;
          font-size: 1rem;
          font-weight: bold;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .zccs-section-title {
          color: #141414;
          font-size: 1.375rem;
          font-weight: bold;
          letter-spacing: -0.015em;
          padding: 24px 0 12px 0;
          margin: 0 0 0 16px;
        }
        .zccs-section-desc {
          color: #141414;
          font-size: 1rem;
          font-weight: 400;
          margin: 0 0 24px 16px;
          line-height: 1.6;
        }
        .zccs-resources-section {
          display: flex;
          flex-direction: column;
          gap: 40px;
          padding: 0 16px 40px 16px;
        }
        .zccs-resources-header {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .zccs-resources-header h1 {
          color: #141414;
          font-size: 2rem;
          font-weight: bold;
          margin: 0;
        }
        .zccs-resources-header p {
          color: #141414;
          font-size: 1rem;
          margin: 0;
        }
        .zccs-viewall-btn {
          min-width: 84px;
          max-width: 480px;
          height: 40px;
          padding: 0 16px;
          background: #000;
          color: #fff;
          font-size: 1rem;
          font-weight: bold;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
        }
        .zccs-resource-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(158px, 1fr));
          gap: 16px;
        }
        .zccs-resource-card {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-bottom: 12px;
        }
        .zccs-resource-img {
          width: 100%;
          aspect-ratio: 16/9;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border-radius: 14px;
        }
        .zccs-resource-title {
          color: #141414;
          font-size: 1rem;
          font-weight: 500;
          margin: 0 0 2px 0;
        }
        .zccs-resource-desc {
          color: #757575;
          font-size: 0.95rem;
          margin: 0;
        }
        .zccs-bottom-btns {
          display: flex;
          justify-content: center;
          gap: 12px;
          padding: 24px 0 0 0;
        }
        .zccs-bottom-btn {
          min-width: 84px;
          max-width: 480px;
          height: 40px;
          padding: 0 16px;
          font-size: 1rem;
          font-weight: bold;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
        }
        .zccs-bottom-btn-black {
          background: #000;
          color: #fff;
        }
        .zccs-bottom-btn-light {
          background: #f2f2f2;
          color: #141414;
        }
        .zccs-navbar {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 48px;
          background: #fff;
          font-family: 'Inter', 'Noto Sans', Arial, sans-serif;
          font-size: 1.18rem;
          font-weight: 500;
          color: #111;
          box-shadow: 0 1px 8px #0001;
        }
        .zccs-navbar-left {
          font-size: 1.5rem;
          font-weight: 900;
          color: #111;
          letter-spacing: -0.02em;
        }
        .zccs-navbar-logo {
          font-family: 'Inter', 'Noto Sans', Arial, sans-serif;
          font-size: 1.5rem;
          font-weight: 900;
          color: #111;
        }
        .zccs-navbar-links {
          display: flex;
          gap: 36px;
        }
        .zccs-navbar-links a {
          color: #111;
          text-decoration: none;
          font-size: 1.15rem;
          font-family: inherit;
          font-weight: 500;
          transition: color 0.2s;
        }
        .zccs-navbar-links a:hover {
          color: #646cff;
        }
        .zccs-navbar-join {
          min-width: 90px;
          height: 42px;
          padding: 0 20px;
          background: #f2f2f2;
          color: #111;
          font-size: 1.1rem;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-family: inherit;
        }
        @media (max-width: 1100px) {
          .zccs-content-container {
            max-width: 98vw;
            padding: 0 8px;
          }
          .zccs-header {
            padding: 16px 16px;
          }
        }
        @media (max-width: 700px) {
          .zccs-hero-bg {
            padding: 0 10px 24px 10px;
          }
          .zccs-section-title, .zccs-section-desc {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
}
