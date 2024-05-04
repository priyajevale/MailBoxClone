
// import Navbar from './components/Layout/Navbar';
// import Auth from './components/Login/Auth';
// import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
// import Dashboard from './components/Dashboard';
// import ComposeMail from './components/compose/ComposeMail';
// function App() {
//   return (
//     <div className="App">
//     <Router>
//     <Navbar />
//   <Routes>
//  < Route path = "/dash" element={<Dashboard/>} />
//         <Route path="/" element={<Auth />} />
//         <Route path="/compose" element={<ComposeMail />} />
//       </Routes>
//       </Router>
//     </div>
//   );
// };
// export default App;
import logo from './logo.svg';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import ComposeMail from './components/compose/ComposeMail';
// import Inbox from './components/Mails/Inbox';
import SentEmail from './components/Mails/Sent';
import  Navbar from './components/Layout/Navbar';
import AuthPage from './components/Login/Auth';
import Inbox from './components/Mails/Inbox';
function App() {
  
   
  return (<>
  <Router>
  <Navbar/>
  <Routes>

  <Route path="/auth" element={<AuthPage />} />
        <Route path="/compose" element={<ComposeMail />} />
        <Route path="/inbox" element={<Inbox/>} />
        <Route path="/sent" element={<SentEmail />} />
      </Routes>
  </Router>


  
  
  </>  
  );
}

export default App;