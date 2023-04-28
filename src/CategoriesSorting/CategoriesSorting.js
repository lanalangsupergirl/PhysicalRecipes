import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import RecipeItem from '../RecipeItem/RecipeItem';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { showFullRecipe, currentRecipeId } from '../store/fullRecipeSlice';
import { useParams } from 'react-router-dom';
import { urlImg } from '../utils';

export default function CategoriesSorting() {
  const { category } = useParams();
  const dataRecipes = useSelector((state) => state.dataRecipes.dataRecipes);
  const recipes = dataRecipes;

  let filteredCategories = [];

  recipes.forEach((recipe) => {
    let cat = recipe.categories;
    for (let i = 0; i < cat.length; i++) {
      if (cat[i] === category) {
        filteredCategories.push(recipe);
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
        {category.toUpperCase()}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredCategories.map((recipe, index) => (
          <Link
            to={`/id=${recipe.id}`}
            style={{ color: 'inherit', textDecoration: 'inherit' }}
            key={'item' + recipe.id}
          >
            <RecipeItem
              index={index}
              title={recipe.title}
              src={urlImg + recipe.path}
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
