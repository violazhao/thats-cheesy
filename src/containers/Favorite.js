import React, { useEffect, useState } from "react";
import "../css/Favorite.css";
import { Button } from "reactstrap";

export default function Favorite({ user_id, recipe_id }) {
    const [isFavorite, setFavorite] = useState(false);
    const label = isFavorite ? "Remove Saved Recipe" : "Save Recipe";
    const [counter, setCounter] = useState("");

    useEffect(() => {
        if (user_id !== "") {
            _getFavorite(user_id, recipe_id);
            // console.log('before:', counter);
        }
    });

    useEffect(() => {
        if (recipe_id !== "") {
            _getCounter(recipe_id);
            // console.log('get c: ', counter);
        }
        // console.log('recipe id', recipe_id)
    }, [recipe_id]);

    function incCounter() {
        let temp = Number(counter);
        temp += 1;
        setCounter(temp);
        updateCounter(recipe_id, temp);
    }

    function decCounter() {
        let temp = Number(counter);
        temp -= 1;
        setCounter(temp);
        updateCounter(recipe_id, temp);
    }

    function _getCounter(id) {
        fetch(`http://127.0.0.1:8000/recipe/${id}`, {
            method: 'GET'
        })  
        .then((response) => response.json())
        .then((data) => {
            setCounter(Number(data.counter));
            // console.log('get count:', data)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function updateCounter(id, temp) {
        fetch(`http://127.0.0.1:8000/recipe/edit/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                counter: temp.toString()
            })
        }).then((response) => response.json())
        .then((data) => {
            console.log('update count:', counter)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    function _getFavorite(user_id, id) {
        fetch(`http://127.0.0.1:8000/favorites/${user_id}/${id}`, {
            method: 'GET'
        })  
        .then((response) => response.json())
        .then((data) => {
            setFavorite(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function _toggleFavorite() {
        fetch(`http://127.0.0.1:8000/favorite-recipe/${user_id}/${recipe_id}`, {
            method: 'POST'
        })  
        .then((response) => response.json())
        .then((data) => {
            // console.log('Successs:', data);
            // _getCounter(recipe_id);
            if (!isFavorite) {
                incCounter();
            } else {
                decCounter();
            }
            setFavorite(!isFavorite);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div className="Favorite">
            <Button className="toggleFavorite" onClick={_toggleFavorite}> 
            {label} </Button> <p>Saved by: {counter}</p>
        </div>
    );
}