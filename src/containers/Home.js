import React from "react";
import "../css/Home.css";
import RecipeListHolder from "./RecipeListHolder";
import { useLocation, Link } from "react-router-dom";

export default function Home({ user_id }) {

  const location = useLocation();

  return (
    <div className="Home-Header">
      <h1>That's Cheesy <span>🧀</span></h1>
      <div className="Home-Recipes">
        <h3 className="Home-h3">My Saved Recipes:</h3>
        <RecipeListHolder saved={true} user_id={user_id}/>
        <br />
        <h3>All Recipes:</h3>
        <div className="add-btn">
          <Link className="addrecipe-btn" to="/addrecipe">Add Recipe</Link>
        </div>
        <RecipeListHolder saved={false} user_id={user_id}/>
      </div>
    </div>
  );
}