import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FullRecipeCard from '../../FullRecipeCard/FullRecipeCard';
import { useNavigate } from 'react-router-dom';
import { getRecipeById } from '../../utils';
import { useSelector } from 'react-redux';

export default function RecipeDetails() {
  const dataRecipes = useSelector((state) => state.dataRecipes.dataRecipes);
  const recipeId = useSelector((state) => state.fullRecipe.recipeId);
  const currentItem = recipeId ? getRecipeById(dataRecipes, recipeId) : undefined;
  const navigate = useNavigate();

  return (
    <Box sx={{ paddingTop: '50px' }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#ccc',
          mb: '45px',
          '&:hover': { backgroundColor: '#b5b3b3' },
        }}
        onClick={() => {
          navigate('/', { replace: true });
        }}
      >
        Назад
      </Button>
      <FullRecipeCard
        text={currentItem.text}
        image={currentItem.images}
        title={currentItem.title}
      />
    </Box>
  );
}
