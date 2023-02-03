import React, { Component } from "react";
import "../css/RecipeFull.css";
import withRouter from "./WithRouter";
import { Link } from 'react-router-dom';
import Favorite from "./Favorite";
import YoutubeEmbed from "../components/YoutubeEmbed";

class RecipeFull extends Component {

    constructor() {
        super();
        this.state = {
            recipe_id: "",
            title: "",
            ingredients: [],
            instructions: [],
            image: null,
            embedId: "",
            notes: "", 
            user_id: "",
            no_user: false,
        }
        this._getRecipe = this._getRecipe.bind(this);
        this._getNotes = this._getNotes.bind(this);
    }

    componentDidMount() {
        const id = this.props.router.params.id;
        const user_id = this.props.user_id;
        this.setState({
            recipe_id: id,
            user_id: user_id
        });
        this._getRecipe(id);
        if (user_id === "no user"){
            this.setState({
                no_user: true
            });
        } else {
            this._getNotes(user_id, id);
        }
    }

    _getRecipe(id) {
        // console.log(`http://127.0.0.1:8000/recipe/${id}`);
        fetch(`http://127.0.0.1:8000/recipe/${id}`, {
            method: 'GET'
        })  
        .then((response) => response.json())
        .then((data) => {
            // console.log('Successs:', data);
            const ingredients = data.ingredients;
            const instructions = data.instructions;
            const title = data.title;
            const image = data.image;
            const embedId = data.embedId;
            this.setState({
                ingredients: ingredients,
                instructions: instructions,
                title: title,
                image: image,
                embedId: embedId
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    _getNotes(user_id, id) {
        fetch(`http://127.0.0.1:8000/notes/${user_id}/${id}`, {
            method: 'GET'
        })  
        .then((response) => response.json())
        .then((data) => {
            // console.log('log', typeof user_id);
            // console.log('Successs:', data);
            this.setState({
                notes: data
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    render(){
        const ingredient_map = this.state.ingredients.map((i, index) => {
            return(<li className="ingredient" key={index}>{i}</li>)
        })

        const instruction_map = this.state.instructions.map((i, index) => {
            return(<li className="instruction" key={index}>{i}</li>)
        })

        return (
            <div className="recipe_full_container">
                <div className="imagevid">
                    <div className="image_container">
                        <h3></h3>
                        <img width="300" src={this.state.image} />
                    </div>
                    <div className="youtube_embed_container">
                        {this.state.embedId === "" ? <div/> : <YoutubeEmbed embedId={this.state.embedId} />}
                    </div>
                </div>
                <div className="body-container-recipe">
                    <div className="title_container">
                        <h1 className="title">{this.state.title}</h1>
                        {this.state.no_user ? <div></div> : <Favorite user_id={this.state.user_id} recipe_id={this.state.recipe_id} />}
                    </div>
                    <div className="ingredient_container">
                        <h3 className="ingredient_title">Ingredients</h3>
                        {ingredient_map}
                    </div>
                    <div className="instruction_container">
                        <h3 className="instruction_title">Instructions</h3>
                        {instruction_map}
                    </div>
                    <div className="note_container">
                        <h3 className="note_title">Notes</h3>
                        {this.state.no_user ? <div className="no_user"> 
                        <Link to="/login" className="editlink"> Log in</Link> to add notes! </div> : this.state.notes}
                    </div>
                    <br></br>
                    <Link to={`/recipe/edit/${this.state.recipe_id}`} className="editlink"> → Edit Recipe</Link>
                </div>
            </div>
        )
    }

} export default withRouter(RecipeFull);
