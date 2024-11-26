import './App.css';
import Message from './components/pages/Message';
import Navbar from './components/pages/Navbar';
import Overview from './components/pages/Overview';
import Patients from './components/pages/Patients';
import Schedule from './components/pages/Schedule';
import Transaction from './components/pages/Transactions';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/overview" element={<Overview />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/message" element={<Message />} />
          <Route path="/transaction" element={<Transaction />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;