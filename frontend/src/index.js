import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Import Components
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

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: 50, transition: { duration: 0.4 } },
};


const PageTransition = ({ children }) => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Signup /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
        <Route path="/placeorder" element={<PageTransition><Placeorder /></PageTransition>} />
        <Route path="/customerdashboard" element={<PageTransition><Studentdashboard /></PageTransition>} />
        <Route path="/riderdashboard" element={<PageTransition><Riderdashboard /></PageTransition>} />
        <Route path="/studentdashboard" element={<PageTransition><Studentdashboard /></PageTransition>} />
        <Route path="/schedule" element={<PageTransition><Schedule /></PageTransition>} />
        <Route path="/riderspage" element={<PageTransition><RidersPage /></PageTransition>} />
        <Route path="/appointmentschedule" element={<PageTransition><Appointmentschedule /></PageTransition>} />
        <Route path="/payment" element={<PageTransition><Payment /></PageTransition>} />
        <Route path="/vieworder" element={<PageTransition><Vieworder /></PageTransition>} />
        <Route path="/viewearnings" element={<PageTransition><Viewearnings /></PageTransition>} />
        <Route path="/managegas" element={<PageTransition><Managegas /></PageTransition>} />
        <Route path="/adminsignup" element={<PageTransition><Adminsignup /></PageTransition>} />
        <Route path="/adminlogin" element={<PageTransition><Adminlogin /></PageTransition>} />
        <Route path="/admindashboard" element={<PageTransition><Admindashboard /></PageTransition>} />
        <Route path="/managegases" element={<PageTransition><ManageGases /></PageTransition>} />
        <Route path="/getgas" element={<PageTransition><Getgas /></PageTransition>} />
        <Route path="/adminuser" element={<PageTransition><AdminUsers /></PageTransition>} />
        <Route path="/availability" element={<PageTransition><Availabilty /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
    <Router>
      <AnimatedRoutes />
    </Router>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();