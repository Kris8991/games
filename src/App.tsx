import React from 'react';
import HomePage from './components/HomePages';
import { Route, Routes } from 'react-router-dom';
import MemoryGame from './components/MemoryGame';
import Sudoku from './components/Sudoku';
const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/memory" element={<MemoryGame />} />
        <Route path="/sudoku" element={<Sudoku />} />
      </Routes>
    </>
  );
};

export default App;
