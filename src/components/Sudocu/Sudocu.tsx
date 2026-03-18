import React from 'react';
import { useNavigate } from 'react-router-dom';
const Sudocu: React.FC = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div>
      <h1>Welcome sudoku. </h1>

      <button onClick={goBack}>◀-- К выбору игры</button>
    </div>
  );
};

export default Sudocu;
