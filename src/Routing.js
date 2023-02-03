import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeContainer } from "./containers/HomeContainer";
import { LoginContainer } from "./containers/LoginContainer";
import { LogoutContainer } from "./containers/LogoutContainer";
import { NavigationContainer } from "./containers/NavigationContainer";
import { RecipeFullContainer } from "./containers/RecipeFullContainer";
import { AddRecipeContainer } from "./components/AddRecipeContainer";
import { EditRecipeContainer } from "./components/EditRecipeContainer";
import { SignUpContainer } from "./containers/SignUpContainer";

export default function Routing() {
    return (
        <BrowserRouter>
            <NavigationContainer></NavigationContainer>
            <Routes>
                <Route path='/' element={<HomeContainer/>} />
                <Route path='/login' element={<LoginContainer/>} />
                <Route path='/logout' element={<LogoutContainer/>} />
                <Route path='/addrecipe' element={<AddRecipeContainer/>} />
                <Route path='/recipe/edit/:id' element={<EditRecipeContainer/>} />
                <Route path='/recipe/:id' element={<RecipeFullContainer/>} />
                <Route path='/signup' element={<SignUpContainer/>} />
            </Routes>
        </BrowserRouter>
    );
}