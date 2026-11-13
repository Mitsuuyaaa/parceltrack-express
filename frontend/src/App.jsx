import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { getToken } from './services/api';

// "/" shows the new Home when logged in, and the public Homepage when logged out.
// useLocation() makes this re-check after login / logout navigations.
function Index() {
    useLocation();
    return getToken() ? <Home /> : <Homepage />;
}

// If your main.jsx already wraps <App /> in <BrowserRouter>,
// remove BrowserRouter from here to avoid nesting two routers.
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;