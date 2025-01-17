import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/my">MyPage</Link>
            {user ? (
                <>
                    <Link to="/profile">Profile</Link>
                    <a href="http://localhost:5000/auth/logout">Logout</a>
                </>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </nav>
    );
};

export default Navbar;
