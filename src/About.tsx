export default function About() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        width: "100%", // Use 100% to fit parent, not 100vw
        background: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <div
        className="about-container"
        style={{
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 4px 24px #0001",
          maxWidth: 1300, // Increased from previous value
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: "72px 56px", // Increased padding
          gap: 72, // Increased gap
          boxSizing: "border-box",
        }}
      >
        <div style={{ flex: 1 }}>
          <h1
            style={{
              color: "#283545",
              fontWeight: 700,
              fontSize: 36,
              marginBottom: 18,
              letterSpacing: 1,
            }}
          >
            About Us
          </h1>
          <p
            style={{
              color: "#283545",
              fontSize: 18,
              lineHeight: 1.7,
              marginBottom: 18,
            }}
          >
            Welcome to ZCCS! We are a passionate team dedicated to building
            modern, scalable, and user-friendly solutions. Our mission is to
            empower users and organizations through technology, creativity, and
            collaboration.
          </p>
          <p
            style={{
              color: "#283545",
              fontSize: 16,
              lineHeight: 1.6,
              marginBottom: 0,
            }}
          >
            Our expertise spans frontend and backend development, cloud
            infrastructure, product design, and more. We believe in simplicity,
            accessibility, and continuous improvement.
          </p>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80"
            alt="About us"
            style={{
              width: "100%",
              maxWidth: 700, // Increased from 440
              borderRadius: 14,
              boxShadow: "0 2px 16px #28354522",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
      <style>
        {`
          @media (max-width: 1200px) {
            .about-container {
              max-width: 98vw !important;
              padding: 40px 10px !important;
              gap: 36px !important;
            }
            .about-container img {
              max-width: 95vw !important;
            }
          }
          @media (max-width: 900px) {
            .about-container {
              flex-direction: column !important;
              gap: 28px !important;
              padding: 32px 10px !important;
            }
            .about-container img {
              max-width: 95vw !important;
            }
          }
        `}
      </style>
    </div>
  );
}