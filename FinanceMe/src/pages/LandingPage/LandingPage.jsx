import React from "react";
import Header from "./LandingHeader";
import Button from "../../components/button";
import Leaderboard from "./Leaderboard";
import './LandingPage.css';

function LandingPage() {
  return (
    <main className="landing-page">
      <Header />
      <Button className="landing-page__play-game-button">Play Room</Button>
      <Leaderboard />
    </main>
  );
}

export default LandingPage;
