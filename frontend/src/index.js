import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Placeorder from './components/placeorder';
import Riderdashboard from './components/riderdashboard';
import Studentdashboard from './components/studentdashboard';
import RidersPage from './components/riderspage';
import Schedule from './components/schedule';
import Appointmentschedule from './components/appointmentschedule';
import Payment from './components/payment';
import Vieworder from './components/vieworder';
import Viewearnings from './components/viewearnings';
import Managegas from './components/managegas';
import Adminsignup from './components/adminsignup';
import Adminlogin from './components/adminlogin';
import Admindashboard from './components/admindashboard';
import ManageGases from './components/managegases';
import Getgas from './components/getgas';
import AdminUsers from './components/adminuser';
import Availabilty from './components/availability';

const App = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/placeorder" element={<Placeorder />} />
          <Route path="/customerdashboard" element={<Studentdashboard />} />
          <Route path="/riderdashboard" element={<Riderdashboard />} />
          <Route path="/studentdashboard" element={<Studentdashboard />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/riderspage" element={<RidersPage />} />
          <Route path="/appointmentschedule" element={<Appointmentschedule />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/vieworder" element={<Vieworder />} />
          <Route path="/viewearnings" element={<Viewearnings />} />
          <Route path="/managegas" element={<Managegas />} />
          <Route path="/adminsignup" element={<Adminsignup />} />
          <Route path="/adminlogin" element={<Adminlogin />} />
          <Route path="/admindashboard" element={<Admindashboard />} />
          <Route path="/managegases" element={<ManageGases />} />
          <Route path="/getgas" element={<Getgas />} />
          <Route path="/adminuser" element={<AdminUsers />} />
          <Route path="/availability" element={<Availabilty />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
