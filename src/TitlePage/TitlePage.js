import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RecipeItem from '../RecipeItem/RecipeItem';
import { useSelector, useDispatch } from 'react-redux';
import { showFullRecipe, currentRecipeId } from '../store/fullRecipeSlice';
import { getMultipleRandom, categories } from '../utils';
import { Link } from 'react-router-dom';

export default function TitlePage() {
  const url = 'http://localhost:8080';

  let randomCategories = getMultipleRandom(categories, 3);

  const dataRecipes = useSelector((state) => state.dataRecipes.dataRecipes);

  let filtered = {};
  console.log('filtered', filtered);

  const recipes = dataRecipes?.recipes;

  recipes?.length &&
    recipes.forEach((recipe) => {
      for (let i = 0; i < randomCategories.length; i++) {
        let cat = randomCategories[i];

        if (!filtered[cat]) {
          filtered[cat] = [];
        }

        if (recipe.categories.indexOf(cat) === -1) {
          continue;
        }

        filtered[cat].push(recipe);
        return;
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

  if (Object.keys(filtered).length === 0) {
    return null;
  }

  return (
    <Container
      disableGutters
      maxWidth="100%"
      sx={{
        display: { md: 'flex' },
        pt: '35px',
      }}
    >
      <Box>
        {randomCategories.map((category) => (
          <React.Fragment key={category + 'fragment'}>
            <Typography variant="h4" sx={{ pl: '12px', mb: '15px', mt: '20px' }}>
              {category.toUpperCase()}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {filtered[category]
                .map((recipe, index) => (
                  <Link
                    to={`id=${recipe.id}`}
                    style={{ color: 'inherit', textDecoration: 'inherit' }}
                    key={category + 'item' + recipe.id}
                  >
                    <RecipeItem
                      index={index}
                      title={recipe.title}
                      src={url + recipe.images}
                      subheader={recipe['macros-info']}
                      alt={recipe.title}
                      description={recipe.description}
                      onItemClick={handleOnItemClick}
                      id={recipe.id}
                      categories={recipe.categories}
                    />
                  </Link>
                ))
                .slice(0, 4)}
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </Container>
  );
}
