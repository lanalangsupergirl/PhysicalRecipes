import * as React from 'react';
import FullRecipeCard from '../../FullRecipeCard/FullRecipeCard';
import { getRecipeById } from '../../utils';
import { useSelector } from 'react-redux';


export default function RecipeDetails() {
  const dataRecipes = useSelector((state) => state.dataRecipes.dataRecipes);
  const recipes = dataRecipes?.recipes;
  const recipeId = useSelector((state) => state.fullRecipe.recipeId);
  const currentItem = recipeId ? getRecipeById(recipes, recipeId) : undefined;

  return (
      <FullRecipeCard
        text={currentItem.text}
        image={currentItem.images}
        title={currentItem.title}
      />
  );
}
