import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import RecipeItem from '../RecipeItem/RecipeItem';
import { Link } from 'react-router-dom';
import { showFullRecipe, currentRecipeId } from '../store/fullRecipeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { urlImg } from '../utils';

export default function IngredientsSorting() {
  const { ingredient } = useParams();
  const dataRecipes = useSelector((state) => state.dataRecipes.dataRecipes);
  const recipes = dataRecipes?.recipes;

  let filteredIngredients = [];

  recipes.forEach((recipe) => {
    let ing = recipe.ingredients;

    for (let i = 0; i < ing.length; i++) {
      if (ing[i] === ingredient) {
        filteredIngredients.push(recipe);
      }
    }
  });
  const dispatch = useDispatch();

  const handleOnItemClick = React.useCallback(
    (id) => {
      dispatch(showFullRecipe(true));
      dispatch(currentRecipeId(id));
    },
    [currentRecipeId, showFullRecipe],
  );

  return (
    <Container disableGutters maxWidth="100%">
      <Typography variant="h4" sx={{ pl: '12px', mb: '15px', mt: '50px' }}>
        {ingredient.toUpperCase()}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredIngredients.map((recipe, index) => (
          <Link
            to={`/id=${recipe.id}`}
            style={{ color: 'inherit', textDecoration: 'inherit' }}
            key={'item' + recipe.id}
          >
            <RecipeItem
              index={index}
              title={recipe.title}
              src={urlImg + recipe.images}
              subheader={recipe.macros}
              alt={recipe.title}
              description={recipe.description}
              text={recipe.text}
              onItemClick={handleOnItemClick}
              id={recipe.id}
              categories={recipe.categories}
            />
          </Link>
        ))}
      </Box>
    </Container>
  );
}
