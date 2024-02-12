import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import BooksList from './components/BooksList';
import BookDetail from './components/BookDetail';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<BooksList />} />
            <Route path="/book" element={<BookDetail />} />
            {/* Define other routes */}
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
