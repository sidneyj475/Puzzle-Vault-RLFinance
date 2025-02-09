import React, { useState } from "react";
import axios from "axios";
import Header from "./LandingHeader";
import Button from "../../components/button";
import Leaderboard from "./Leaderboard";
import "./LandingPage.css";

function LandingPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState(""); // Store extracted text
  const [isProcessing, setIsProcessing] = useState(false); // Handle loading state

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Send file to Flask backend
      const response = await axios.post("https://5c99-198-137-18-219.ngrok-free.app/upload_pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Store extracted text
      setExtractedText(response.data.extracted_text);
      alert("File uploaded and parsed successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Something went wrong uploading/parsing the file.");
    }
  };

  const handleQuizzify = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.post("https://ugabackend.onrender.com/process_pdf");

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

  return (
    <main className="landing-page">
      <Header />

      {/* File input for uploading PDF */}
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload & Parse PDF</Button>

      {/* Quizzify button to process and store quiz */}
      <Button onClick={handleQuizzify} disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Quizzify"}
      </Button>

      {/* Display extracted text */}
      {extractedText && (
        <div className="extracted-text">
          <h3>Extracted Text from PDF:</h3>
          <pre>{extractedText}</pre>
        </div>
      )}

      <Leaderboard />
    </main>
  );
}

export default LandingPage;
