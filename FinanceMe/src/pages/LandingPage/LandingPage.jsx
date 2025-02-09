// LandingPage.jsx
import React, { useState } from "react";
import axios from "axios";
import LandingHeader from "./LandingHeader";
import Button from "../../components/button";
import Leaderboard from "./Leaderboard";
import { useNavigate } from "react-router-dom";
import './LandingPage.css';

function LandingPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false); // For Quizzify button
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // POST the file to your backend
      await axios.post(
        'https://5c99-198-137-18-219.ngrok-free.app/upload_pdf', 
        formData, 
        { 
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      alert('File uploaded and parsed successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Something went wrong uploading/parsing the file.');
    }
  };

  const handleQuizzify = async () => {
    setIsProcessing(true);
    try {
      // POST request to your process_pdf endpoint
      const response = await axios.post("https://5c99-198-137-18-219.ngrok-free.app/process_pdf");

      if (response.data.error) {
        alert("Failed to generate and store quiz: " + response.data.error);
        setIsProcessing(false);
        return;
      }

      alert(`Quiz successfully processed and stored! ${response.data.quiz_count} questions added.`);
    } catch (error) {
      console.error("Error processing quiz:", error);
      alert("Something went wrong while processing the quiz.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePlayGame = () => {
    navigate('/roomSelect');
  };

  return (
    <main className="landing-page">
      <LandingHeader />

      {/* File upload section */}

      {/* Quizzify button */}
      <Button onClick={handleQuizzify} disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Quizzify"}
      </Button>

      {/* Play Game button */}
      <Button 
        className="landing-page__play-game-button"
        onClick={handlePlayGame}
      >
        Play Game
      </Button>

      <Leaderboard />
    </main>
  );
}

export default LandingPage;
