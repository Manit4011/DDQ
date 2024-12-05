// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';


const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* <Route path="/" element={<Login />} /> */}
                <Route path="/" element={<Dashboard />} />
                {/* Add more routes here, e.g., <Route path="/dashboard" element={<Dashboard />} /> */}
            </Routes>
        </Router>
    );
};

export default App;
