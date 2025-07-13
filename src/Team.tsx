import React from "react";

const team = [
  {
    name: "Alice Johnson",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    about: "Frontend developer passionate about UI/UX and accessibility.",
  },
  {
    name: "Bob Smith",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    about: "Backend engineer who loves scalable systems and clean code.",
  },
  {
    name: "Carla Gomez",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    about: "Fullstack developer and cloud enthusiast.",
  },
  {
    name: "David Lee",
    photo: "https://randomuser.me/api/portraits/men/76.jpg",
    about: "DevOps specialist and automation advocate.",
  },
  {
    name: "Emma Brown",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
    about: "Product designer focused on simplicity and usability.",
  },
];

export default function Team() {
  // Set the body background color to match the component
  React.useEffect(() => {
    const prev = document.body.style.background;
    document.body.style.background = "#f0f0f0";
    return () => {
      document.body.style.background = prev;
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%", // Use 100% to fit parent, not 100vw
        background: "#f0f0f0",
        padding: "40px 0",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      <h1
        style={{
          color: "#283545",
          textAlign: "center",
          marginBottom: 40,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        Meet Our Team
      </h1>
      <div
        className="team-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // 3 per row on desktop
          gap: "48px", // Increased gap
          width: "100%",
          maxWidth: 1200, // Increased from 1400/1100
          margin: "0 auto",
          padding: "0 32px",
          flex: 1,
        }}
      >
        {team.map((member) => (
          <div
            key={member.name}
            className="team-card"
            style={{
              background: "#283545",
              borderRadius: 18,
              boxShadow: "0 4px 24px #0001",
              minHeight: 340,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 32,
              transition: "transform 0.25s cubic-bezier(.4,2,.3,1), box-shadow 0.25s",
              cursor: "pointer",
              border: "2px solid #e0e0e0",
            }}
          >
            <img
              src={member.photo}
              alt={member.name}
              style={{
                width: 110,
                height: 110,
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: 20,
                border: "4px solid #fff",
                boxShadow: "0 2px 12px #0002",
                background: "#fff",
              }}
            />
            <h2
              style={{
                fontSize: 21,
                fontWeight: 700,
                color: "#fff",
                margin: "0 0 10px 0",
                textAlign: "center",
                letterSpacing: 0.5,
              }}
            >
              {member.name}
            </h2>
            <p
              style={{
                color: "#e0e6ef",
                fontSize: 15,
                textAlign: "center",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {member.about}
            </p>
          </div>
        ))}
      </div>
      <style>
        {`
          .team-card:hover {
            transform: translateY(-10px) scale(1.04) rotate(-1deg);
            box-shadow: 0 12px 32px #28354544, 0 2px 8px #0001;
            border-color: #283545;
          }
          @media (max-width: 1400px) {
            .team-grid {
              max-width: 1000px;
              gap: 32px;
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: 1000px) {
            .team-grid {
              max-width: 700px;
              grid-template-columns: repeat(1, 1fr) !important;
              gap: 18px;
            }
            .team-card {
              padding: 20px !important;
            }
          }
          @media (max-width: 700px) {
            .team-grid {
              max-width: 98vw;
              grid-template-columns: 1fr !important;
              gap: 14px;
              padding: 0 6px !important;
            }
            .team-card {
              min-height: 0 !important;
              padding: 14px !important;
            }
          }
        `}
      </style>
    </div>
  );
}