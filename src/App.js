import React from "react";
import { hot } from "react-hot-loader";
import "./App.css";
import Header from "./Header/Header.js";
import Container from "@mui/material/Container";
import SearchBar from "./SearchBar/SearchBar.js"

function App () {
    return (
      <div className="App">
        <Header />
        <Container
          sx={{
            height: 200,
            width: '100%',
            backgroundColor: 'lightslategrey',
            display: {md: 'flex' },
            pt: '88px',
          }}
        >
          <SearchBar />
        </Container>
      </div>
    );
}

export default hot(module)(App);
