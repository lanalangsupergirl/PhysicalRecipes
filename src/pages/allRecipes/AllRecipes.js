import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import RecipeItem from '../../RecipeItem/RecipeItem.js';
import { useSelector, useDispatch } from 'react-redux';
import { showFullRecipe, currentRecipeId } from '../../store/fullRecipeSlice';
import { Link } from 'react-router-dom';

export default function AllRecipes() {
  const dataRecipes = useSelector((state) => state.dataRecipes.dataRecipes);
  const dispatch = useDispatch();

  const handleOnItemClick = React.useCallback(
    (id) => {
      dispatch(showFullRecipe(true));
      dispatch(currentRecipeId(id));
    },
    [currentRecipeId, showFullRecipe],
  );

  return (
    <Container disableGutters>
      {/* <Typography variant="h4">все рецепты</Typography> */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {dataRecipes.map((recipe) => (
          <Link
            to={`/${recipe.title}`}
            style={{ color: 'inherit', textDecoration: 'inherit' }}
            key={'item' + recipe.id}
          >
            <RecipeItem
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
