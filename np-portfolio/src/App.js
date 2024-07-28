import './App.css';
import {Routes, Route} from 'react-router-dom';
import NavBar from './Navbar.js';
import Footer from './Footer.js';
import Resume from './Pages/Resume.js';
import Projects from './Pages/Projects.js';
import Contact from './Pages/Contact.js';

function App() {
  return (
    <div className="App">
          <NavBar />

          <Routes>
          {/* Define routes */}
          <Route path = "/resume" element={<Resume />} />
          <Route path = "/projects" element={<Projects />} />
          <Route path = "/contact" element={<Contact />} />

          </Routes>

          <Footer />
        </div>
  );
}

export default App;
