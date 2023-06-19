import React from 'react';
import './Info.css';

const Info = () => {
  return (
    <div className="info">
      <h2 className="info-title">Game Instructions</h2>
      <ul className="info-list">
        <li className="info-item">
          <span className="info-label">Roll the Dice:</span> Click the "Roll Dice" button to roll the dice and get a
          number.
        </li>
        <li className="info-item">
          <span className="info-label">Move on the Board:</span> Move your player token on the board according to the
          rolled number.
        </li>
        <li className="info-item">
          <span className="info-label">Obstacles:</span>
          <ul className="sub-info-list">
            <li className="sub-info-item">
              Black Holes: If you land on the first black hole, you will be teleport to the next black hole. However,
              if you land on the second black hole, you will be teleported back to the previous black hole.
            </li>
            <li className="sub-info-item">
              Magnetar: If you land on the magnetar square, your next move will be decreased by half. For example, if you
              roll a 6, it will be halved to 3 steps.
            </li>
          </ul>
        </li>
        <li className="info-item">
          <span className="info-label">Start and End Squares:</span> The game starts from the start square (red circle), and your goal
          is to reach the end square (green circle) to win.
        </li>
      </ul>
    </div>
  );
};

export default Info;
