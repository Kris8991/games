import React, { type ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SignIn } from '../signIn';
import MemoryGame from '../memoryGame';
import Sudoku from '../sudoku';
import { SignUp } from '../signUp';
import Enter from '../enter';
import HomePage from '../homePage';
import { RedirectIfAuth, RequireAuth } from '../../hoc';

const protectRoute = (node: ReactElement) => {
  return <RequireAuth>{node}</RequireAuth>;
};
const publicRoute = (node: ReactElement) => {
  return <RedirectIfAuth>{node}</RedirectIfAuth>;
};
const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={protectRoute(<HomePage />)} path="/" />
      <Route element={publicRoute(<Enter />)} path="/enter" />
      <Route element={publicRoute(<SignUp />)} path="/sign_up" />
      <Route element={publicRoute(<SignIn />)} path="/sign_in" />
      <Route element={protectRoute(<MemoryGame />)} path="/memory" />
      <Route element={protectRoute(<Sudoku />)} path="/sudoku" />
    </Routes>
  );
};

export default AppRouter;
