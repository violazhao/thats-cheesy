import React, { useState } from "react";
import "../css/AddRecipe.css";
import { Button, Form, FormGroup, Input } from "reactstrap";  
import { useNavigate } from "react-router";
import AddListItem from "./AddListItem";

export default function AddRecipe({ user_id }) {
  const [title, setTitle] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [instruction, setInstruction] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [image, setImage] = useState("");
  const [embedId, setEmbedId] = useState("");
  const [invalidURL, setInvalidURL] = useState(false);
  const [note, setNote] = useState("");
  const [noUser, setNoUser] = useState(user_id === "no user");
  const [ingredientMap, setIngredientMap] = useState([]);
  const [instructionMap, setInstructionMap] = useState([]);
  const [noIngredients, setNoIngredients] = useState(true);
  const [noInstructions, setNoInstructions] = useState(true);
  const [ingredientLimitReached, setIngredientLimitReached] = useState(false);
  const [instructionLimitReached, setInstructionLimitReached] = useState(false);
  const [invalidTitle, setInvalidTitle] = useState(true);

  const navigate = useNavigate();

  const addrecipe = async () => {
    const rawResponse = await fetch('http://127.0.0.1:8000/addrecipe', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipe: {
          title: title, 
          ingredients: ingredients, 
          instructions: instructions, 
          image: image,
          embedId: embedId,
          counter: "0"
        },
        notes: {
          note: note,
          user_id: user_id
        }
      })
    });
    const content = await rawResponse.json();
    // console.log(content);

    navigate('/');
  };

  const cancel = () => {
    navigate('/');
  }

  // const onChangeImage = event => {
  //   if (event.target.files && event.target.files[0]) {
  //       let img = event.target.files[0];
  //       setImage(
  //         URL.createObjectURL(img)
  //       );
  //   }
  // }

  function _getEmbedId(event) {
    if (event === "") {
      setEmbedId("");
      setInvalidURL(false);
    } else {
      const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/
      const match = event.match(regExp);
      if (match === null) {
        setInvalidURL(true);
      } else {
        setEmbedId(match[1]);
        setInvalidURL(false);
      }
    }
  }

  function _invalidList(list) {
    const res = [false, false]
    if (list.length < 1) res[0] = true;
    if (list.length >= 10) res[1] = true;
    return res;
}

  function _updateIngredients(add, new_item, index) {
    var new_ingredients = ingredients;
    if (add) {
      if (index === -1) new_ingredients.push(new_item);
      else new_ingredients[index] = new_item;
    } else new_ingredients.splice(index, 1);
    setIngredients(new_ingredients);
    setIngredientMap(
      new_ingredients.map((i, i_index) => {
        return(
          <AddListItem
            item={i}
            index={i_index}
            _update={_updateIngredients}
            key={i_index}
          />)
        }
      )
    );
    const limit = _invalidList(new_ingredients);
    setNoIngredients(limit[0]);
    setIngredientLimitReached(limit[1]);
    setIngredient("");
    // console.log(new_ingredients);
  }

  function _updateInstructions(add, new_item, index) {
    var new_instructions = instructions;
    if (add) {
      if (index === -1) new_instructions.push(instruction);
      else new_instructions[index] = new_item;
    } else new_instructions.splice(index, 1);
    setInstructions(new_instructions);
    setInstructionMap(
      new_instructions.map((i, i_index) => {
        return(
          <AddListItem
            item={i}
            index={i_index}
            _update={_updateInstructions}
            key={i_index}
          />)
        }
      )
    );
    const limit = _invalidList(new_instructions);
    setNoInstructions(limit[0]);
    setInstructionLimitReached(limit[1]);
    setInstruction("");
    // console.log(new_instructions);
  }

  function onChangeTitle(e) {
    if (e.target.value === "") setInvalidTitle(true);
    else {
      setTitle(e.target.value);
      setInvalidTitle(false);
    }
  }

  return (
    <div className="EditRecipe-main">
      <div className="EditRecipe-header">
        <h1 className="EditRecipe-Header">
          Add Your New Recipe Below
        </h1>
        <div className="edit-imagevid">
          <Form>
            <img width="300" className="editimg" src={image} />
            <br></br>
            <FormGroup className="AddRecipe-input">
              <p>Image URL:  <Input
                type="text"
                value={image}
                id="image-input"
                className="Edit-image-input"
                placeholder="Image URL"
                onChange={(e) => setImage(e.target.value)}
              />
              </p>
            </FormGroup>
            {/* <h3>Select Image</h3> */}
            {/* <input type="file" name="myImage" onChange={onChangeImage} /> */}
            <h3></h3>
            <div className="youtubeInput container">
              {invalidURL ? <div id="invalidURL" className="Error">
                ** Invalid URL
              </div> : <div/>}
              <FormGroup className="AddRecipe-input">
                <p>YouTube URL:  <Input
                  type="text"
                  defaultValue=""
                  id="AddYoutubeURL-input"
                  className="Edit-yt-input"
                  placeholder="YouTube URL"
                  onBlur={(e) => _getEmbedId(e.target.value)}
                />
                </p>
              </FormGroup>
            </div>
          </Form>
        </div>
        <div className="editbody-container-recipe">
          <Form>
            <h1 className="edit-title">Title: {title}</h1>
            <div className="edit-title-padding">
              {invalidTitle ? <div className="invalidTitle" id="invalidTitle">Must include title</div> : <div/>}
              <FormGroup className="EditRecipe-input">
                <p>Title:  <Input
                  type="text"
                  defaultValue={title}
                  id="title-input"
                  className="Edit-title-input"
                  placeholder="Title"
                  onBlur={(e) => onChangeTitle(e)}
                  required
                  maxLength={64}
                />
                </p>
              </FormGroup>
            </div>
            <div className="ingredientDisplay">
              <h3>Ingredients</h3>
              {ingredientMap}
              {ingredientLimitReached ? <div className="limitReached" id="limitReached">Ingredient Limit Reached (Max: 10)</div>: <div/>}
              {noIngredients ? <div className="limitReached" id="limitReached">Must include at least 1 ingredient</div> : <div />}
            </div>
            <br></br>
            <FormGroup className="EditRecipe-input"> 
              <div className="padded-input">
                <Input
                  type="text"
                  value={ingredient}
                  id="EditRecipe-input"
                  className="Edit-Instruction-input"
                  placeholder="Ingredient"
                  onChange={(e) => setIngredient(e.target.value)}
                  required
                />
              </div>
              <Button 
                onClick={() => _updateIngredients(true, ingredient, -1)} 
                className="UpdateIngredient"
                disabled={ingredientLimitReached}
                >
                  Add
              </Button>
            </FormGroup>
            <br></br>
            <div className="instructionDisplay">
              <h3>Instructions</h3>
              {instructionMap}
              {instructionLimitReached ? <div className="limitReached" id="limitReached">Instruction Limit Reached (Max: 10)</div>: <div/>}
              {noInstructions ? <div className="limitReached" id="limitReached">Must include at least 1 instruction</div> : <div />}
            </div>
            <br></br>
            <FormGroup className="EditRecipe-input"> 
              <div className="padded-input">
                <Input
                  type="text"
                  value={instruction}
                  id="EditRecipe-input"
                  className="Edit-Instruction-input"
                  placeholder="Instruction"
                  onChange={(e) => setInstruction(e.target.value)}
                  required
                />
              </div>
              <Button 
                onClick={() => _updateInstructions(true, instruction, -1)} 
                className="UpdateIngredient"
                disabled={instructionLimitReached}
              >
                  Add
              </Button>
            </FormGroup>
            <br></br>
            {noUser ? <div className="noUserMessage">Log in to add personal notes!</div> : <div/>}
            <div className="personalnotes">
              <FormGroup className="User-input"> 
                <Input
                  type="textarea"
                  id="User-input"
                  placeholder="Notes"
                  className="edit-personalnotes"
                  maxLength={250}
                  onChange={(e) => setNote(e.target.value)}
                  disabled={noUser}
                />
              </FormGroup>
            </div>
          </Form>
          <div className="cancel-div">
            <Button className="cancel_button" onClick={cancel}>
              Cancel
            </Button>
          </div>
          <div className="update-div">
            <Button 
              onClick={addrecipe} 
              className="EditRecipe-update-btn"
              disabled={noIngredients || noInstructions || invalidTitle}
              >
              Add Recipe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}