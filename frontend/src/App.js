import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import axios from "axios";
import Mypage from "./pages/Mypage";
import MainPage from "./pages/MainPage";
import Landing from "./pages/Landing";
import Footer from "./components/Footer";
import { UniversalPage } from "./pages/UniversalPage";

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
        <div className="flex flex-col items-center min-h-screen text-white bg-gradient-to-br from-black from-40% via-gray-900 via-60% to-indigo-900 to-90%">
            <Router>
                <Navbar/>
                <Routes>
                    {/* <Route path="/" element={user ? <Landing user={user} /> : <Navigate to="/login" />} /> */}
                    <Route path="/" element={<Landing />} />
                    <Route path="/universal" element={<UniversalPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
                    <Route path="/my" element={<Mypage/>} />
                    <Route path="/main" element={<MainPage/>} />
                </Routes>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;