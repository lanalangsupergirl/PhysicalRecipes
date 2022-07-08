import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import RecipeItem from '../../RecipeItem/RecipeItem.js'
import recipes from '../../recipes.json';

const data = recipes;


export default function TestComponent () {
    return (
      <Container disableGutters>
        <Typography variant="h4">все рецепты</Typography>
        <Box sx={{ display: 'flex' }}>
          {data.recipes.map((recipe) => (
            <RecipeItem
              key={recipe.images}
              title={recipe.title}
              src={recipe.images}
              subheader={recipe['macros-info']}
              alt={recipe.title}
              description={recipe.description}
              // keywords={recipe.keywords}
            />
          ))}
        </Box>
      </Container>
    );


}