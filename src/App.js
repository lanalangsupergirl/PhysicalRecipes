import React from "react";
import { hot } from "react-hot-loader";
import "./App.css";
import Header from "./Header/Header.js";
import Container from "@mui/material/Container";
import SearchBar from "./SearchBar/SearchBar.js";
import RecipeItem from "./RecipeItem/RecipeItem.js"

function App () {
    return (
      <div className="App">
        <Header />
        <Container
          maxWidth="xl"
          sx={{
            height: 200,
            backgroundColor: 'lightslategrey',
            display: { md: 'flex' },
            pt: '88px',
          }}
        >
          <SearchBar />
        </Container>
        <Container
          maxWidth="xl"
          sx={{
            display: { md: 'flex' },
            pt: '88px',
          }}
        >
          <RecipeItem />
          <RecipeItem />
          <RecipeItem />
        </Container>
      </div>
    );
}

export default hot(module)(App);
