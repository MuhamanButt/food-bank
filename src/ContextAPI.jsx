import React, { createContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
const ContextAPI = () => {
    const recipeTheme=createContext();
    const firebase = useFirebase();
    const [Recipes, setRecipes] = useState([]);
    useEffect(() => {
      firebase.getAllRecipes().then((recipes) => setRecipes(recipes.docs));
    }, []);
  return (
    <div>
      
    </div>
  )
}

export default ContextAPI
