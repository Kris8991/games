import React from 'react';
import HomePage from './components/HomePages';
import { Route, Routes } from 'react-router-dom';
import MemoryGame from './components/MemoryGame';
import Sudoku from './components/Sudoku';
import Enter from './components/Enter/enter';
import RequierAuth from './HOC/RequierAuth';
import Sign_up from './components/Auth/sign_up';
import Sign_in from './components/Auth/sign_in';
const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RequierAuth>
              <HomePage />
            </RequierAuth>
          }
        />
        <Route path="/enter" element={<Enter />} />
        <Route path="/sign_up" element={<Sign_up />} />
        <Route path="/sign_in" element={<Sign_in />} />

        <Route
          path="/memory"
          element={
            <RequierAuth>
              <MemoryGame />
            </RequierAuth>
          }
        />
        <Route
          path="/sudoku"
          element={
            <RequierAuth>
              <Sudoku />
            </RequierAuth>
          }
        />
      </Routes>
    </>
  );
};

export default App;
