import React from 'react';
import './Leaderboard.css';
import { useState } from 'react';
import nextArrow from '../../assets/nextArrow.svg';

function Leaderboard() {
  const [genreIndex, setGenreIndex] = useState(0);

  const data = [[
    { level: 1, personalBest: '4:52', topTime: 'Jaden — 8:52' },
    { level: 2, personalBest: '8:52', topTime: 'Jaden — 8:52' },
    { level: 3, personalBest: '-:--', topTime: 'Jaden — 8:52' },
  ], 
  [
    { level: 1, personalBest: '-:--', topTime: 'blorp — 8:52' },
    { level: 2, personalBest: '2:00', topTime: 'Jaden — 8:52' },
    { level: 3, personalBest: '-:--', topTime: 'Jaden — 8:52' },
  ]
]

  const handlePrevGenre = () => {
    setGenreIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  }

  const handleNextGenre = () => {
    setGenreIndex((prevIndex) => (prevIndex + 1) % data.length);
  }

  const genres = ["Asset Management", "Personal Finance", "Banking"]

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-carousel">
        <button className="leaderboard-carousel__next-button" onClick={handlePrevGenre}>
        <img style={{width: "100%", height: "100%", rotate: "90deg"}}src={nextArrow}/>
        </button>
        <p>{genres[genreIndex]}</p>
        <button className="leaderboard-carousel__next-button" onClick={handleNextGenre}>
          <img style={{width: "100%", height: "100%", rotate: "-90deg"}}src={nextArrow}/>
        </button>
      </div>
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
          {data[genreIndex].map(({ level, personalBest, topTime }) => (
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
