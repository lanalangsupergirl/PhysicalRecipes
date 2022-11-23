import * as React from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { hideSearchBar } from '../store/searchSlice';
import { useDispatch } from 'react-redux';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const ingredientOptions = [
  'яйца',
  'молоко',
  'курица',
  'говядина',
  'авокадо',
  'творог',
  'сыр',
  'йогурт',
  'морепродукты',
];

export const categoryOptions = [
  'завтрак',
  'обед',
  'ужин',
  'белок',
  'выпечка',
  'десерт',
  'сушка',
  'массонабор',
  'поддержка',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function AddRecipe() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [macros, setMacros] = useState('');
  const [text, setText] = useState('');
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [hideEl, setHideEl] = useState(false);


  useEffect(() => {
    if (hideEl === true) {
      return setTimeout(() => {
        dispatch(hideSearchBar(false));
        navigate('/');
      }, 2000);
    }
  }, [hideEl]);

  const handleChangeCat = (event) => {
    const {
      target: { value },
    } = event;
    setCategories(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangeIng = (event) => {
    const {
      target: { value },
    } = event;
    setIngredients(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = { title, description, macros, categories, ingredients, text };
    console.log(newRecipe);
    console.log(JSON.stringify(newRecipe));

    fetch('http://localhost:8080/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe),
    }).then(() => {
      console.log('added!');
      setHideEl(true);
    });
  };

  return (
    <>
      {hideEl === true ? (
        <Box sx={{ pt: '55px' }}>
          <Typography variant="h4" sx={{ fontFamily: 'roboto', fontWeight: 300 }}>
            Рецепт успешно добавлен!
          </Typography>
        </Box>
      ) : (
        <Container
          disableGutters
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          maxWidth="100%"
          sx={{
            display: { md: 'flex' },
            pt: '35px',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h4" sx={{ pl: '12px', mb: '15px', mt: '20px' }}>
            ДОБАВИТЬ НОВЫЙ РЕЦЕПТ
          </Typography>
          <Box
            sx={{
              display: 'flex',
              //   flexDirection: 'column',
              //   '& > :not(style)': { m: 1, width: '35ch' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                '& > :not(style)': { m: '11px', width: '38ch' },
              }}
            >
              <TextField
                id="standard-basic"
                label="Название рецепта"
                variant="standard"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                id="standard-basic"
                label="КБЖУ на 100гр/все блюдо"
                variant="standard"
                name="macros"
                value={macros}
                onChange={(e) => setMacros(e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Категории</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  name="categories"
                  value={categories}
                  onChange={handleChangeCat}
                  input={<OutlinedInput id="select-multiple-chip" label="Категории" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {categoryOptions.map((category) => (
                    <MenuItem
                      key={category}
                      value={category}
                      style={getStyles(category, categories, theme)}
                    >
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Ингредиенты</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  name="ingredients"
                  value={ingredients}
                  onChange={handleChangeIng}
                  input={<OutlinedInput id="select-multiple-chip" label="Ингредиенты" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {ingredientOptions.map((ingredient) => (
                    <MenuItem
                      key={ingredient}
                      value={ingredient}
                      style={getStyles(ingredient, ingredients, theme)}
                    >
                      {ingredient}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <TextField
            id="outlined-textarea"
            label="Описание"
            placeholder="Краткое описание рецепта"
            multiline
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              '& > :not(style)': { m: 1, width: '73.5ch' },
            }}
          />
          <TextField
            id="outlined-multiline-static"
            label="Рецепт"
            name="text"
            value={text}
            multiline
            rows={10}
            placeholder="Текст рецепта"
            onChange={(e) => setText(e.target.value)}
            sx={{
              '& > :not(style)': { m: 1, width: '73.5ch' },
            }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: '#ccc',
              borderRadius: '18px',
              width: '117px',
              mb: '45px',
              ml: '8px',
              '&:hover': { backgroundColor: '#b5b3b3' },
            }}
          >
            Отправить
          </Button>
        </Container>
      )}
    </>
  );
}

// import { useNavigate } from 'react-router-dom';
// let navigate = useNavigate();

// useEffect(() => {
//   if (LoggedIn) {
//     return navigate('/');
//   }
// }, [LoggedIn]);
