import React, { type ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from '../state/userState/authState';

type RedirectIfAuthProps = { children: ReactElement };

const RedirectIfAuth: React.FC<RedirectIfAuthProps> = ({ children }) => {
  const { user } = useAuthState();
  if (user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default RedirectIfAuth;
