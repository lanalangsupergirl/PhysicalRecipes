import * as React from 'react';
import Container from '@mui/material/Container';
import RecipeItem from '../RecipeItem/RecipeItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import recipes from '../recipes.json';

const categories = [
  'завтрак',
  'обед',
  'ужин',
  'белок',
  'салат',
  'выпечка',
  'десерт',
  'сушка',
  'массонабор',
  'поддержка',
];

const data = recipes;

function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

let randomCategories = getMultipleRandom(categories, 3);

console.log(randomCategories);
console.log(data.recipes);

let filtered = {};

data.recipes.forEach((recipe) => {
  for (let i = 0; i < randomCategories.length; i++) {
    let cat = randomCategories[i];
    if (!filtered[cat]) {
      filtered[cat] = [];
    }

    if (recipe.keywords.indexOf(cat) === -1) {
      continue;
    }

    filtered[cat].push(recipe);
  }
});
console.log(filtered);

export default function Content() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: { md: 'flex' },
        pt: '88px',
      }}
    >
      <Container disableGutters>
        {randomCategories.map((category) => (
          <React.Fragment key={category + 'fragment'}>
            <Typography variant="h4">
              {category}
            </Typography>
            <Box sx={{ display: 'flex' }}>
              {filtered[category].map((recipe) => (
                <RecipeItem
                  key={category + 'item' + recipe.id}
                  title={recipe.title}
                  src={recipe.images}
                  subheader={recipe['macros-info']}
                  alt={recipe.title}
                  description={recipe.description}
                  text={recipe.text}
                />
              ))}
            </Box>
          </React.Fragment>
        ))}
      </Container>
    </Container>
  );
}
