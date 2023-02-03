import React, { useState } from "react";
import "../css/Logout.css";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export default function Logout({ handleLogout }) {
    const navigate = useNavigate();

    const logout = () => {
        handleLogout();
        navigate('/login');
    };

    return (
        <div className="Logout">
            <h3 className="logout-title"><span className="login-cheese">🧀</span> <br/> Are you sure you want to log out?</h3>
            <Button className="logoutButton" onClick={logout}>Log Out</Button>
        </div>
    )
}