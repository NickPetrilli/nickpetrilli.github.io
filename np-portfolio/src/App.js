import './App.css';
import './Navbar.css';
import './Footer.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar        from './Navbar.js';
import Footer        from './Footer.js';
import Home          from './Pages/Home.js';
import Resume        from './Pages/Resume.js';
import Projects      from './Pages/Projects.js';
import LoadingScreen from './components/LoadingScreen.js';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-EM5HTXG5G7', { page_path: location.pathname });
    }
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`App${loading ? ' loading' : ''}`}>
      {loading && <LoadingScreen />}
      {!loading && <NavBar />}

      <Routes>
        <Route path="/"         element={<Home />}     />
        <Route path="/resume"   element={<Resume />}   />
        <Route path="/projects" element={<Projects />} />
      </Routes>

      {!loading && <Footer />}
    </div>
  );
}

export default App;
