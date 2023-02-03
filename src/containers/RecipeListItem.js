import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RecipeListItem.css";

export default function RecipeListItem({ id, title, image, ingredients, instructions, user_id }) {

    const navigate = useNavigate();
    
    function handleClick() {
        navigate(`/recipe/${id}`);
    }

    return(
        <div className="RecipeListItem" onClick={handleClick}>
            <img className="recipeListImg" width="150" height="150" src={image} />
            <div className="title">{title}</div>
        </div>
    )

}