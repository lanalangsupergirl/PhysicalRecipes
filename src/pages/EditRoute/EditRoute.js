import * as React from 'react';
import EditRecipe from '../../EditRecipe/EditRecipe';
import { useSelector } from 'react-redux';

export default function EditRoute() {
  const recipeId = useSelector((state) => state.fullRecipe.recipeId);
  console.log('recipeId', recipeId);

  return <EditRecipe id={recipeId} />;
}
