import './App.css';
import { useState, useEffect, useRef } from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import NavBar from './Navbar.js';
import Footer from './Footer.js';
import Home from './Pages/Home.js';
import Resume from './Pages/Resume.js';
import Projects from './Pages/Projects.js';
import Contact from './Pages/Contact.js';

function App() {

  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const canvasRef = useRef(null);

  // Track page views on route changes
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-EM5HTXG5G7', { page_path: location.pathname });
    }
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const fontSize = 14;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));

    let lastTime = 0;
    const interval = 1000 / 20;
    let animationId;

    const draw = (timestamp) => {
      animationId = requestAnimationFrame(draw);
      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const y = drops[i] * fontSize;
        if (y < 0) { drops[i]++; continue; }

        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${fontSize}px 'Courier New', monospace`;
        ctx.fillText(Math.random() > 0.5 ? '1' : '0', i * fontSize, y);

        if (drops[i] > 1) {
          ctx.fillStyle = '#00ff41';
          ctx.font = `${fontSize}px 'Courier New', monospace`;
          ctx.fillText(Math.random() > 0.5 ? '1' : '0', i * fontSize, (drops[i] - 1) * fontSize);
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -20);
        }
        drops[i]++;
      }
    };

    animationId = requestAnimationFrame(draw);

    const handleResize = () => {
      resize();
      columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`App ${loading ? 'loading' : ''}`}>
      {loading && (
        <div className="loading-overlay">
          <canvas ref={canvasRef} className="matrix-canvas" />
          <div className="loading-bar-container">
            <div className="loading-bar"></div>
            <div>Loading...</div>
          </div>
        </div>
      )}

      {!loading && <NavBar />}
      
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {!loading && <Footer />}
    </div>
  );
}

export default App;
