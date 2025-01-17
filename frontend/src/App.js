import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import axios from "axios";
import Mypage from "./pages/Mypage";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:5000/auth/login/success", { withCredentials: true });
                setUser(res.data.user);
            } catch (err) {
                console.error("Not authenticated", err);
            }
        };
        fetchUser();
    }, []);

    return (
        <Router>
            <Navbar user={user} />
            <Routes>
                <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
                <Route path="/my" element={<Mypage/>} />
            </Routes>
        </Router>
    );
}

export default App;
