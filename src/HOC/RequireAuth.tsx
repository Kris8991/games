import React, { type ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from '../stores/user';

type RequierAuthProps = {
  children: ReactElement;
};

const RequireAuth: React.FC<RequierAuthProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAuthState();

  if (!user) {
    return <Navigate to="/enter" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
