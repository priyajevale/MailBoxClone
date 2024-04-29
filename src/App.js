import logo from './logo.svg';
import './App.css';
import Navbar from './components/Layout/Navbar';
import Auth from './components/Login/Auth';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
    <Navbar />
  <Routes>

        <Route path="/" element={<Auth />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
