import React from "react";
import Header from "./LandingHeader";
import Button from "../../components/button";
import Leaderboard from "./Leaderboard";

function LandingPage() {
  return (
    <main className="landing-page">
      <Header />
      <Button onClick={() => alert("Signing Out...")}>Sign Out</Button>
      <Leaderboard />
    </main>
  );
}

export default LandingPage;
