import React from 'react';
import HomePage from './components/HomePages';
import { Route, Routes } from 'react-router-dom';
import MemoryGame from './components/MemoryGame';
import Sudoku from './components/Sudoku';
import Enter from './components/Enter';
import { RedirectIfAuth, RequireAuth } from './HOC/index';
import { Sign_up, Sign_in } from './components/Auth/index';
const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route
          path="/enter"
          element={
            <RedirectIfAuth>
              <Enter />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/sign_up"
          element={
            <RedirectIfAuth>
              <Sign_up />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/sign_in"
          element={
            <RedirectIfAuth>
              <Sign_in />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/memory"
          element={
            <RequireAuth>
              <MemoryGame />
            </RequireAuth>
          }
        />
        <Route
          path="/sudoku"
          element={
            <RequireAuth>
              <Sudoku />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
};

export default App;
