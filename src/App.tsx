import React from 'react';
import HomePage from './components/HomePages';
import { Route, Routes } from 'react-router-dom';
import MemoryGame from './components/MemoryGame';
import Sudocu from './components/Sudoku';
const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/memory" element={<MemoryGame />} />
        <Route path="/sudocu" element={<Sudocu />} />
      </Routes>
    </>
  );
};

export default App;
