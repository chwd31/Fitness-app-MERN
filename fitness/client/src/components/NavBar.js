import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ isLoggedIn, handleLogout }) => {
    const handleLogout = () => {
        // Clear token from local storage or cookies
        handleLogout();
    };

    return (
        <nav>
            <Link to="/">Home</Link>
            {isLoggedIn ? (
                <>
                    <Link to="/exercise">Exercise</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/weeklystats">Weekly Stats</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </>
            )}
        </nav>
    );
};

export default NavBar;
