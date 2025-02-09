import React, { useState, useEffect, useContext } from 'react';
import './Leaderboard.css';
import nextArrow from '../../assets/nextArrow.svg';
import { AuthContext } from '../../AuthContext';

function Leaderboard() {
  const [genreIndex, setGenreIndex] = useState(0);

  // State for the top times across all users
  const [topTimes, setTopTimes] = useState({
    shortest_time1: { time: '8:52', username: 'Jaden' },
    shortest_time2: { time: '8:52', username: 'Jaden' },
    shortest_time3: { time: '8:52', username: 'Jaden' },
  });

  // State for the current user's personal best times
  const [userTimes, setUserTimes] = useState({
    username: '',
    time1: '-:--',
    time2: '-:--',
    time3: '-:--',
  });

  // This should be your actual user's name, e.g. from auth or context
  const { username } = useContext(AuthContext);

  // Fetch global best times on component mount
  useEffect(() => {
    async function fetchGlobalBestTimes() {
      try {
        const response = await fetch('https://ugabackend.onrender.com/leaderboard_best_of_all');
        const data = await response.json();
        setTopTimes(data);
      } catch (error) {
        console.error('Error fetching global best times:', error);
      }
    }
    fetchGlobalBestTimes();
  }, []);

  // Fetch the current user's times
  useEffect(() => {
    async function fetchUserTimes() {
      try {
        if (!username) return;  // If no user is logged in, skip
        const response = await fetch(
          `https://ugabackend.onrender.com/leaderboard_user?username=${username}`
        );
        const data = await response.json();
        // Check if there's an error message in the response
        if (data.error) {
          console.error('Error fetching user times:', data.error);
        } else {
          // Set user times
          setUserTimes(data);
        }
      } catch (error) {
        console.error('Error fetching user times:', error);
      }
    }
    fetchUserTimes();
  }, [username]);

  // Build data array to hold info about each level
  // Use the times from "userTimes" for Personal Best 
  // and "topTimes" for the top time
  const data = [
    [
      {
        level: 1,
        personalBest: userTimes.time1,  // from /leaderboard_user
        topTime: topTimes.shortest_time1?.username
          ? `${topTimes.shortest_time1.username} — ${topTimes.shortest_time1.time}`
          : 'Jaden — 8:52'
      },
      {
        level: 2,
        personalBest: userTimes.time2,
        topTime: topTimes.shortest_time2?.username
          ? `${topTimes.shortest_time2.username} — ${topTimes.shortest_time2.time}`
          : 'Jaden — 8:52'
      },
      {
        level: 3,
        personalBest: userTimes.time3,
        topTime: topTimes.shortest_time3?.username
          ? `${topTimes.shortest_time3.username} — ${topTimes.shortest_time3.time}`
          : 'Jaden — 8:52'
      },
    ]
  ];

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
}

export default Leaderboard;
