import * as React from 'react';
import FullRecipeCard from '../../FullRecipeCard/FullRecipeCard';
import { useSelector } from 'react-redux';


export default function RecipeDetails() {
  const recipeId = useSelector((state) => state.fullRecipe.recipeId);
  console.log('recipeId', recipeId);

  return <FullRecipeCard id={recipeId} />;
}
