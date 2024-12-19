import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import Register from './pages/register/register';
import Login from './pages/login/login';
import ForgotPass from './pages/forgotPass/forgotPass';
import ResetPass from './pages/resetPass/resetPass';


const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/forgot-password" element={<ForgotPass/>} />
                <Route path="/reset-password" element={<ResetPass/>} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* Add more routes here, e.g., <Route path="/dashboard" element={<Dashboard />} /> */}
            </Routes>
        </Router>
    );
};

export default App;
