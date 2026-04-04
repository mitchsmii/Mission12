import ProjectPage from './pages/ProjectPage';
import DonatePage from './pages/DonatePage';
import CartPage from './pages/CartPage';
import AdminBookPage from './pages/AdminBookPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectPage />} />
        <Route path="/donate/:title/:bookID" element={<DonatePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/adminbooks" element={<AdminBookPage />} />
      </Routes>
    </Router>
  );
}

export default App;
