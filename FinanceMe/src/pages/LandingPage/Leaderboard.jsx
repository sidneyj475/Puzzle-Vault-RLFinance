import React, { useState, useEffect } from 'react';
import './Leaderboard.css';
import nextArrow from '../../assets/nextArrow.svg';

function Leaderboard() {
  const [genreIndex, setGenreIndex] = useState(0);

  // Initialize topTimes with the original string values
  const [topTimes, setTopTimes] = useState({
    shortest_time1: 'Jaden — 8:52',
    shortest_time2: 'Jaden — 8:52',
    shortest_time3: 'Jaden — 8:52'
  });

  // Fetch leaderboard data on component mount
  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch('https://ugabackend.onrender.com/leaderboard');
        const data = await response.json();
        setTopTimes(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    }
    fetchLeaderboard();
  }, []);

  // Use the fetched topTimes for each level while keeping personalBest unchanged
  const data = [[
    { level: 1, personalBest: '4:52', topTime: topTimes.shortest_time1 },
    { level: 2, personalBest: '8:52', topTime: topTimes.shortest_time2 },
    { level: 3, personalBest: '-:--', topTime: topTimes.shortest_time3 },
  ]];

  const handlePrevGenre = () => {
    setGenreIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const handleNextGenre = () => {
    setGenreIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const genres = ["Leaderboard"];

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-carousel">
        <p>{genres[genreIndex]}</p>
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
} //

export default Leaderboard;
