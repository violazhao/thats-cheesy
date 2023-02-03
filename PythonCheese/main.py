from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.json_util import dumps, loads

# These dependecies alpip3 low us to create the basic structure of our Flask application and connect to MongoDB
app = Flask(__name__)  # Create the Flask application
CORS(app)
# Connect to MongoDB
# app.config["MONGO_URI"] = "mongodb://localhost:27017/cheesydb"
client = MongoClient(
    "mongodb+srv://Viola:Cheesy123@cheesy.1pp17n9.mongodb.net/?retryWrites=true&w=majority")
db = client.cheesydb
recipes_collection = db.recipes
user_collection = db.login

### Recipe class that uses ObjectId as its primary key: ###

class Recipe:
    def __init__(self, title, ingredients, instructions, personal_notes=None, image=None, counter=0, _id=None):
        self.title = title
        self.ingredients = ingredients
        self.instructions = instructions
        self.personal_notes = personal_notes
        self.image = image
        self.counter = counter
        self._id = ObjectId() if _id is None else _id

### User Class ###

class User:
    def __init__(self, username, password, _id=None):
        self.username = username
        self.password = password
        self._id = ObjectId() if _id is None else _id

# Set up to create API endpoints for our Flask application
### Recipes ###

@app.route('/recipes', methods=['GET'])
def get_recipes():
    recipes = recipes_collection.find()
    recipes_list = list(recipes)
    return dumps(recipes_list), 200

@app.route('/addrecipe', methods=['POST'])
def add_recipe():
    body = request.json
    recipe = body['recipe']
    res = recipes_collection.insert_one(recipe)
    user_id = body['notes']['user_id']
    note = body['notes']['note']
    if user_id != "no user" and note != "":
        recipe_id = str(res.inserted_id)
        add_notes(user_id, recipe_id, note)
    return dumps({'message': 'Recipe added successfully'}), 201

def add_notes(user_id, recipe_id, note):
    query = {}
    query['notes.' + recipe_id] = note
    user_collection.update_one({'_id': ObjectId(user_id)}, {'$set': query})

@app.route('/recipe/edit/<id>', methods=['POST'])
def edit_recipe(id):
    recipe = request.json
    recipes_collection.update_one({'_id': ObjectId(id)}, {'$set': recipe})
    return dumps({'message': 'Recipe updated successfully'}), 200

@app.route('/recipe/<id>', methods=['GET'])
def get_recipe(id):
    recipe = recipes_collection.find_one({'_id': ObjectId(id)})
    recipe_obj = dict(recipe)
    return dumps(recipe_obj), 200

@app.route('/recipe/<id>', methods=['PUT'])
def update_recipe(id):
    recipe = request.json
    recipes_collection.update_one({'_id': ObjectId(id)}, {'$set': recipe})
    return dumps({'message': 'Recipe updated successfully'}), 200

@app.route('/recipe/<id>', methods=['DELETE'])
def delete_recipe(id):
    recipes_collection.delete_one({'_id': ObjectId(id)})
    return dumps({'message': 'Recipe deleted successfully'}), 200

### Favorite Recipes Endpoints ###

@app.route('/favorite-recipe/<user_id>/<recipe_id>', methods=['POST'])
def toggle_favorite_recipe(user_id, recipe_id):
    user = user_collection.find_one({'_id': ObjectId(user_id)})
    if recipe_id not in user['saved']:
        user_collection.update_one({'_id': ObjectId(user_id)}, {'$push': {'saved': recipe_id}})
        message = 'Recipe added to favorites successfully'
    else:
        user_collection.update_one({'_id': ObjectId(user_id)}, {'$pull': {'saved': recipe_id}})
        message = 'Recipe removed from favorites successfully'
    return dumps({'message': message}), 201

### User ###

@app.route('/login', methods=['POST'])
def get_users(): 
    login = request.json
    users = user_collection.find_one({ '$and': [{'username': login['username']}, {'password': login['password']}] })
    return dumps(users) # returns null if username and password do not match any records

@app.route('/adduser', methods=['POST'])
def add_user():
    login = request.json
    user_collection.insert_one(login)
    return dumps({'message': 'User added successfully'}), 201

@app.route('/favorites/<user_id>/<recipe_id>', methods=['GET'])
def is_favorite(user_id, recipe_id):
    user = user_collection.find_one({'_id': ObjectId(user_id)})
    favorites = user['saved']
    res = False
    for recipe in favorites:
        if recipe == recipe_id:
            res = True
    return dumps(res)

@app.route('/favorites/<user_id>', methods=['GET'])
def get_favorites(user_id):
    user = user_collection.find_one({'_id': ObjectId(user_id)})
    favorites = user['saved']
    res = []
    for recipe in favorites:
        if recipe != "":
            res.append(loads(get_recipe(recipe)[0]))
    return dumps(res)

@app.route('/allfavorites', methods=['GET'])
def get_all_favorites():
    users = user_collection.find({}, {'_id': 1})
    return dumps(users)

@app.route('/notes/<user_id>/<recipe_id>', methods=['GET'])
def get_notes(user_id, recipe_id):
    user = user_collection.find_one({'_id': ObjectId(user_id)})
    notes = user['notes']
    res = "No Notes Yet!"
    for note in notes:
        if recipe_id in note:
            res = notes[recipe_id]
    return dumps(res)

@app.route('/notes/update-note/<user_id>/<recipe_id>', methods=['POST'])
def update_note(user_id, recipe_id):
    note = request.json
    query = {}
    query['notes.' + recipe_id] =  note['note']
    if note['note'] == "":
        user_collection.update_one({'_id': ObjectId(user_id)}, {'$unset': query})
    else: 
        user_collection.update_one({'_id': ObjectId(user_id)}, {'$set': query})
    return dumps({'message': 'Successfully updated note'}), 201

if __name__ == "__main__":
    app.run(port=8000, debug=True)
