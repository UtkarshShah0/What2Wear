import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import MaybeShowNavbar from './components/MaybeShowNavbar';

function App() {

  return (
    <Router>
      <MaybeShowNavbar>
        <Navbar/>
      </MaybeShowNavbar>

      <Routes>
        
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  )
}

export default App;
