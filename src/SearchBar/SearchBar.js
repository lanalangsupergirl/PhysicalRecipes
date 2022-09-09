import React, { useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux';
import { changeFlag, searchInputChange, clearSearchInput } from '../store/searchSlice';
import { useDebounce } from '../hooks/debounce';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '30px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ClearIconWrapper = styled('div')(({ theme }) => ({
  // padding: theme.spacing(0, 30),
  position: 'relative',
  // pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '85ch',
      height: '4ch',
    },
  },
}));

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchInput = useSelector((state) => state.search.searchInput);
  console.log('searchInput', searchInput);
  const flag = useSelector((state) => state.search.flag);
  console.log('flag', flag);

  const handleChangeInput = (e) => {
    e.preventDefault();

    dispatch(searchInputChange(e.target.value));
  };

  useEffect(() => {
    if (searchInput.length === 0) {
      dispatch(changeFlag(false));
      return;
    }

    dispatch(changeFlag(true));
  }, [searchInput.length]);

  const debounced = useDebounce(searchInput);

  console.log('debounced', debounced);

  useEffect(() => {
    console.log(debounced);
  }, [debounced]);

  const handleClearInput = React.useCallback(() => {
    dispatch(clearSearchInput(''));
  });

  return (
    <Box sx={{ flexGrow: 1, maxWidth: '900px' }}>
      <Search sx={{ display: 'flex' }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Поиск по названию, ингредиенту или категории"
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleChangeInput}
          value={searchInput}
        />
        <ClearIconWrapper>
          <ClearIcon
            onClick={handleClearInput}
            sx={{
              fill: 'lightgray',
              '&:hover': {
                fill: 'black',
              },
              cursor: 'pointer'
            }}
          />
        </ClearIconWrapper>
      </Search>
    </Box>
  );
}

// const handleKeyDown = (event) => {
//   if (event.key === 'Enter') {
//     console.log('smth');
//   }
// };
