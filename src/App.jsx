import React, { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import PeacockPreloader from './components/PeacockPreloader.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './sections/HomePage.jsx';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      return () => lenis.destroy();
    }
  }, [loading]);

  return (
    <>
      {loading && <PeacockPreloader onComplete={() => setLoading(false)} />}

      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 1.5s ease-out', minHeight: '100vh', background: '#faf8f5' }}>
        <Navbar />
        <HomePage />
        <Footer />
      </div>
    </>
  );
}

export default App;