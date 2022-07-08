import React from 'react';
// import { hot } from 'react-hot-loader';
import "./App.css";
import Header from './Header/Header.js';
import Container from '@mui/material/Container';
import SearchBar from './SearchBar/SearchBar.js';
// import Content from "./Content/Content.js";
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage.js';
import TestComponent from './pages/testComponent/TestComponent.js'

function App() {
  return (
    <div className="App">
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          height: 200,
          backgroundColor: '#7c808e',
          display: { md: 'flex' },
          pt: '88px',
        }}
      >
        <SearchBar />
      </Container>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/test" element={<TestComponent />} />
      </Routes>
    </div>
  );
}

// export default hot(module)(App);
export default App
