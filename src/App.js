
import Navbar from './components/Layout/Navbar';
import Auth from './components/Login/Auth';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ComposeMail from './components/compose/ComposeMail';
function App() {
  return (
    <div className="App">
    <Router>
    <Navbar />
  <Routes>
 < Route path = "/dash" element={<Dashboard/>} />
        <Route path="/" element={<Auth />} />
        <Route path="/compose" element={<ComposeMail />} />
      </Routes>
      </Router>
    </div>
  );
};
export default App;