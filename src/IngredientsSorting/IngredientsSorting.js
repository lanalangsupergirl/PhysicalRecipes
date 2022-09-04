import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import RecipeItem from '../RecipeItem/RecipeItem';
import { Link } from 'react-router-dom';
import { showFullRecipe, currentRecipeId } from '../store/fullRecipeSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function IngredientsSorting() {
  const { ingredient } = useParams();
  const dataRecipes = useSelector((state) => state.dataRecipes.dataRecipes);

  let filteredIngredients = [];

  dataRecipes.forEach((recipe) => {
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
    <Container>
      <Box sx={{ display: 'flex' }}>
        {filteredIngredients.map((recipe, index) => (
          <Link
            to={`/${recipe.title}`}
            style={{ color: 'inherit', textDecoration: 'inherit' }}
            key={'item' + recipe.id}
          >
            <RecipeItem
              index={index}
              title={recipe.title}
              src={recipe.images}
              subheader={recipe['macros-info']}
              alt={recipe.title}
              description={recipe.description}
              text={recipe.text}
              onItemClick={handleOnItemClick}
              id={recipe.id}
            />
          </Link>
        ))}
      </Box>
    </Container>
  );
}
