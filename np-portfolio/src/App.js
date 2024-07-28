import './App.css';
import { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import NavBar from './Navbar.js';
import Footer from './Footer.js';
import Home from './Pages/Home.js';
import Resume from './Pages/Resume.js';
import Projects from './Pages/Projects.js';
import Contact from './Pages/Contact.js';

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Duration of loading animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`App ${loading ? 'loading' : ''}`}>
      {loading && (
        <div className="loading-overlay">
          <div className="binary-gif">
            {/* You can add a gif or loading animation here */}
          </div>
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
