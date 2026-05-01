import React, { type ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SignIn } from '../SignIn';
import MemoryGame from '../MemoryGame';
import Sudoku from '../Sudoku';
import { SignUp } from '../SignUp';
import Enter from '../Enter';
import HomePage from '../HomePage';
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
