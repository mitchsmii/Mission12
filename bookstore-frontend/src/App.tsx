import ProjectPage from './pages/ProjectPage';
import DonatePage from './pages/DonatePage';
import CartPage from './pages/CartPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectPage />} />
        <Route path="/donate/:title/:bookID" element={<DonatePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
