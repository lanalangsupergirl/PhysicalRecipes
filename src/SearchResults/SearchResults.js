import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RecipeItem from '../RecipeItem/RecipeItem';
import { showFullRecipe, currentRecipeId } from '../store/fullRecipeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function SearchResults() {
  const dataRecipes = useSelector((state) => state.dataRecipes.dataRecipes);

  const searchInput = useSelector((state) => state.search.searchInput);

  let filtered = dataRecipes.filter((recipe) => {
    return (
      recipe.ingredients.join().includes(searchInput.toLowerCase()) ||
      recipe.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      recipe.categories.join().includes(searchInput.toLowerCase())
    );
  });
  console.log('filtered', filtered);

  const dispatch = useDispatch();

  const handleOnItemClick = React.useCallback(
    (id) => {
      dispatch(showFullRecipe(true));
      dispatch(currentRecipeId(id));
    },
    [currentRecipeId, showFullRecipe],
  );

  return (
    <Container disableGutters sx={{ pt: '55px' }}>
      {/* <Typography variant="h4">Результат поиска</Typography> */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {filtered.map((recipe) => (
          <Link
            to={`/${recipe.title}`}
            style={{ color: 'inherit', textDecoration: 'inherit' }}
            key={recipe.title + 'fragment'}
          >
            <RecipeItem
              key={recipe.title + 'item' + recipe.id}
              title={recipe.title}
              src={recipe.images}
              subheader={recipe['macros-info']}
              alt={recipe.title}
              description={recipe.description}
              text={recipe.text}
              id={recipe.id}
              onItemClick={handleOnItemClick}
            />
          </Link>
        ))}
      </Box>
    </Container>
  );
}

// const isFullRecipe = useSelector((state) => state.fullRecipe.isFullRecipe);
// const recipeId = useSelector((state) => state.fullRecipe.recipeId);
// const currentItem = recipeId ? getRecipeById(dataRecipes, recipeId) : undefined;

// return (
//     <>
//     {flag === true ? (
//     <>
//       {isFullRecipe && currentItem !== undefined ? (
//         <Container disableGutters sx={{ pt: '55px' }}>
//           <Box>
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: '#ccc',
//                 mb: '45px',
//                 '&:hover': { backgroundColor: '#b5b3b3' },
//               }}
//               onClick={() => {
//                 navigate('/all', { replace: true });
//                 handleOnItemClick();
//               }}
//             >
//               Назад
//             </Button>
//             <FullRecipeCard
//               text={currentItem.text}
//               image={currentItem.images}
//               title={currentItem.title}
//             />
//           </Box>
//         </Container>
//       ) : (
//         <Container disableGutters sx={{ pt: '55px' }}>
//           {/* <Typography variant="h4">Результат поиска</Typography> */}
//           <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
//             {filtered.map((recipe) => (
//               <React.Fragment key={recipe.title + 'fragment'}>
//                 <RecipeItem
//                   key={recipe.title + 'item' + recipe.id}
//                   title={recipe.title}
//                   src={recipe.images}
//                   subheader={recipe['macros-info']}
//                   alt={recipe.title}
//                   description={recipe.description}
//                   text={recipe.text}
//                   id={recipe.id}
//                   onItemClick={handleOnItemClick}
//                 />
//               </React.Fragment>
//             ))}
//           </Box>
//         </Container>
//       )}
//     </>) : (<TitlePage />)
//     }
//   </>
//   )
// }
