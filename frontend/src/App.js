import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "./context/userContext";  // Import UserContext

import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Profile from "./pages/profile/Profile"
// import axios from "axios";

import Mypage from "./pages/Mypage";
import MainPageReact from "./pages/MainPageReact";
import MainPagePlain from "./pages/MainPagePlain";
import Landing from "./pages/Landing";
import Footer from "./components/Footer";
import { UniversalPage } from "./pages/UniversalPage";

function ProtectedRoute({ children }) {
    const { user } = useUser();  // Get user context
  
    if (!user) {
        window.location.href = "http://localhost:5000/auth/google";
        return null;
    }
  
    return children;  // Return children (Profile page) if user is authenticated
}

function App() {
    return (
        <UserProvider>
            <div className="flex flex-col items-center min-h-screen text-white bg-gradient-to-br from-black from-40% via-gray-900 via-60% to-indigo-900 to-90%">
                <Router>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Landing/>} />
                        <Route path="/universal" element={<UniversalPage />} />
                        <Route path="/login" element={<Login />} />
                        {/* {<ProtectedRoute><Profile /></ProtectedRoute>} */}
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/my" element={<Mypage/>} />
                        <Route path="/main/react" element={<MainPageReact/>} />
                        <Route path="/main/plain" element={<MainPagePlain/>} />
                    </Routes>
                    <Footer/>
                </Router>
            </div>
        </UserProvider>
    );
}

export default App;