import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import About from './pages/About';
import AdminDashboard from './pages/admin/Dashboard';
import ManageCourses from './pages/admin/ManageCourses';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-black min-h-screen text-green-400">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/courses" element={<ManageCourses />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
