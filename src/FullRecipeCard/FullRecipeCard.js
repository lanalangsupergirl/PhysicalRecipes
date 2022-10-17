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

export default function FullRecipeCard(props) {
  const { text, image, title } = props;
  const flag = useSelector((state) => state.search.flag);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
          <Box
            component="img"
            sx={{
              height: 200,
              width: 200,
              maxHeight: { xs: 100, md: 250 },
              maxWidth: { xs: 100, md: 250 },
              mr: 1,
            }}
            src={image}
            alt={title}
          ></Box>
          {/* <Typography component={'span'} variant="body2" color="text.secondary"></Typography> */}
          <ReactMarkdown>{text}</ReactMarkdown>
        </Container>
      )}
    </>
  );
}
