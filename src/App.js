import React from 'react';
import Info from './components/Info';
import Board from './components/Board';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <div className="info-container">
        <Info />
      </div>
      <div className="board-container">
        <Board />
      </div>
    </div>
  );
};

export default App;
