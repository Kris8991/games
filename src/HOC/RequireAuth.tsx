import React, { type ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from '../state/userState/authState';

type RequierAuthProps = {
  children: ReactElement;
};
console.log('Requier');

const RequireAuth: React.FC<RequierAuthProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAuthState();
  //const auth = user?.name;
  console.log(user);

  if (!user) {
    console.log('редирект');

    return <Navigate to="/enter" state={{ from: location }} />;
  }
  console.log('children');

  return children;
};

export default RequireAuth;
