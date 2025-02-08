import React from "react";
import Header from "./LandingHeader";
import Button from "../../components/button";
import { useNavigate } from 'react-router-dom';
import Leaderboard from "./Leaderboard";
import './LandingPage.css';



function LandingPage() {

  const navigate = useNavigate();

  const handlePlayGame = () => {
    navigate('/roomSelect');
  };


  return (
    <main className="landing-page">
      <Header />
      <Button 
        className="landing-page__play-game-button"
        onClick={handlePlayGame}
      >Play Game</Button>
      <Leaderboard />
    </main>
  );
}

export default LandingPage;
