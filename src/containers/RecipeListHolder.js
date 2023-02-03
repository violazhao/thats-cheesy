import React, { Component } from "react";
import "../css/RecipeFull.css";
import { Link } from 'react-router-dom';
import RecipeListItem from "./RecipeListItem";

class RecipeListHolder extends Component {

    constructor(){
        super();
        this.state = {
            recipes: [],
            user_id: "",
            no_user: false,
        }
        this._getRecipes = this._getRecipes.bind(this);
    }

    componentDidMount(){
        const saved = this.props.saved;
        const user_id = this.props.user_id;
        this.setState({
            user_id: user_id
        })
        if (saved){
            if (user_id === "no user"){
                this.setState({
                    no_user: true
                });
            } else {
                this._getRecipes(`http://127.0.0.1:8000/favorites/${user_id}`);
            }
        } else {
            this._getRecipes('http://127.0.0.1:8000/recipes');
        }
    }

    _getRecipes(url){
        fetch(url, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log('Successs:', data);
            this.setState({
                recipes: data
            })
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    render(){
        const recipe_list = this.state.recipes.map((recipe, index) => {
            return (
                <div className='carousel-container' key={index}>
                    <RecipeListItem
                        id={recipe._id.$oid}
                        title={recipe.title} 
                        image={recipe.image}
                        ingredients={recipe.ingredients} 
                        instructions={recipe.instructions}
                        user_id={this.state.user_id}
                    />
                </div>
            )
        })

        return(
            <div className="RecipeListHolder">
                {recipe_list.length !== 0 ? recipe_list : 
                <div className="noRecipes"> No Recipes Yet! </div>}
                {this.state.no_user ? <div className="loginMessage">
                    <Link className="login-link-rlh" to="/login">Log in</Link> to save your favorites!
                    </div> : <div/>}
            </div>
        )
    }
} export default RecipeListHolder;