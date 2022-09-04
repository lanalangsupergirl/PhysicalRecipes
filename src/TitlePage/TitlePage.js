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
  let randomCategories = getMultipleRandom(categories, 3);

  const dataRecipes = useSelector((state) => state.dataRecipes.dataRecipes);

  let filtered = {};

  dataRecipes.forEach((recipe) => {
    for (let i = 0; i < randomCategories.length; i++) {
      let cat = randomCategories[i];
      if (!filtered[cat]) {
        filtered[cat] = [];
      }

      if (recipe.categories.indexOf(cat) === -1) {
        continue;
      }

      filtered[cat].push(recipe);
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
    <Container
      disableGutters
      maxWidth="100%"
      sx={{
        display: { md: 'flex' },
        pt: '55px',
      }}
    >
      <Box>
        {randomCategories.map((category) => (
          <React.Fragment key={category + 'fragment'}>
            <Typography variant="h4" sx={{pl: '12px'}}>{category.toUpperCase()}</Typography>
            <Box sx={{ display: 'flex' }}>
              {filtered[category]
                .map((recipe, index) => (
                  <Link
                    to={`/${recipe.title}`}
                    style={{ color: 'inherit', textDecoration: 'inherit' }}
                    key={category + 'item' + recipe.id}
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
                ))
                .slice(0, 4)}
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </Container>
  );
}
