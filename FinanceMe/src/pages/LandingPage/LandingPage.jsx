// LandingPage.jsx
import React, { useState } from "react";
import axios from "axios";
import Header from "./LandingHeader";
import Button from "../../components/button";
import Leaderboard from "./Leaderboard";
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [questionsData, setQuestionsData] = useState(null); 
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
      const response = await axios.post(
        'http://localhost:8000/process_pdf', 
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

  const handlePlayGame = () => {
    navigate('/roomSelect', { state: { questionsData } });
    // Option 2: You could store the Q&A data in Context or a global store (e.g. Redux)
  };

  return (
    <main className="landing-page">
      <Header />

      {/* File input for uploading PDF */}
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload & Parse PDF</Button>

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
