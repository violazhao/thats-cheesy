import React from "react";
import "../css/Navigation.css"
import { Link } from 'react-router-dom';

export default function Navigation({ user_id }) {
    return (
        <div className="nav">
            <div className="nav-left">
                <Link className="links" to="/">Home</Link>
            </div>
            <div className="nav-right">
                {user_id === "no user" ? 
                <Link className="links" to="/login">Log In</Link> : 
                <Link className="links" to="/logout">Log Out</Link>}
                {/* <Link className="links" to="/addrecipe">Add Recipe</Link> */}
            </div>
        </div>
    );
}