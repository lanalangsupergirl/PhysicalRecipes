import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ReactMarkdown from 'react-markdown';
import SearchResults from '../SearchResults/SearchResults';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearSearchInput } from '../store/searchSlice';
import { useEffect } from 'react';
import { fetchRecipe } from '../store/dataRecipesSlice';
import { useParams } from 'react-router-dom';
import { urlImg } from '../utils';

export default function FullRecipeCard(props) {
  const { id } = props;


  let url = useParams();

  const flag = useSelector((state) => state.search.flag);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dataRecipes = useSelector((state) => state.dataRecipes.dataRecipes);
  console.log('dataRec', dataRecipes);

  const recipe = useSelector((state) => state.dataRecipes.recipe);
  console.log('recipe', recipe);

  useEffect(() => {
    if (dataRecipes?.length === 0) {
      dispatch(fetchRecipe(url.id));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentItem = recipe;
  console.log('currentItem', currentItem);

  let currentRecipe = {};

  if (dataRecipes?.recipes?.length > 0) {
    currentRecipe = dataRecipes.recipes.find((recipe) => {
      return recipe.id === id;
    });
  }

  console.log('currentRecipe', currentRecipe);

  let renderData = currentRecipe ? currentRecipe : currentItem;
  console.log('renderData', renderData);

  // if (!renderData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      {flag === true ? (
        <SearchResults />
      ) : (
        <Container disableGutters sx={{ m: 0 }}>
          <Box sx={{ paddingTop: '50px' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#ccc',
                borderRadius: '18px',
                mb: '45px',
                '&:hover': { backgroundColor: '#b5b3b3' },
              }}
              onClick={() => {
                navigate(-1);
                dispatch(clearSearchInput(''));
              }}
            >
              Назад
            </Button>
          </Box>
          <Typography variant="h4" sx={{ mb: '15px' }}>
            {renderData.title}
          </Typography>
          <Box
            component="img"
            sx={{
              height: 200,
              width: 200,
              maxHeight: { xs: 100, md: 250 },
              maxWidth: { xs: 100, md: 250 },
              mr: 1,
            }}
            src={urlImg + renderData.images}
            alt={renderData.title}
          ></Box>
          {/* <Typography component={'span'} variant="body2" color="text.secondary"></Typography> */}
          <ReactMarkdown>{renderData.text}</ReactMarkdown>
        </Container>
      )}
    </>
  );
}
