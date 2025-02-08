import React from 'react';
import './Leaderboard.css';

function Leaderboard() {
  // Sample data; replace with your own as needed
  const data = [
    { level: 1, personalBest: '4:52', topTime: 'Jaden — 8:52' },
    { level: 2, personalBest: '8:52', topTime: 'Jaden — 8:52' },
    { level: 3, personalBest: '-:--', topTime: 'Jaden — 8:52' },
  ];

  return (
    <div className="leaderboard-container">
      <table className="leaderboard-table">
        <thead>
          <tr>
            {/* Left column is empty on the header */}
            <th className="empty-header" />
            <th>Personal Best Time</th>
            <th>Top Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ level, personalBest, topTime }) => (
            <tr key={level}>
              <td className="level-cell">Level {level}</td>
              <td className="time-cell">{personalBest}</td>
              <td className="time-cell">{topTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
