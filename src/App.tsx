import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ValidateJSON from './pages/ValidateJSON';
import UploadJSON from './pages/UploadJSON';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/validate" element={<ValidateJSON />} />
            <Route path="/upload" element={<UploadJSON />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;