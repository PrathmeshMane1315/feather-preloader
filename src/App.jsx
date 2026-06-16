import React, { useState } from "react";
import PeacockPreloader from "./components/PeacockPreloader.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <PeacockPreloader onComplete={() => setLoading(false)} />}
      
      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 1.5s ease-out",
          minHeight: "100vh",
          background: "#000000",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ 
          fontFamily: "'Playfair Display', serif",
          fontSize: "3.5rem",
          background: "linear-gradient(135deg, #c9a227, #ff6b6b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Welcome to Krishalaa
        </h1>
      </div>
    </>
  );
}

export default App;