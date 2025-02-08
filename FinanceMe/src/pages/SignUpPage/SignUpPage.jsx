import React, { useState, useEffect } from 'react';
import Button from '../../components/button';
import './SignUpPage.css';
import Logo from '../../components/Logo.jsx';
import axios from "axios";

export default function SignUpPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [resultMessage, setResultMessage] = useState("");

  useEffect(() => {
    axios.get("https://ugabackend.onrender.com/quiz/categories")
      .then(response => setCategories(response.data.categories))
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  const fetchQuiz = (category) => {
    setSelectedCategory(category);
    axios.get(`https://ugabackend.onrender.com/quiz/${category}`)
      .then(response => setQuiz(response.data))
      .catch(error => console.error("Error fetching quiz:", error));
  };

  const submitAnswer = (question, selectedOption) => {
    axios.post("https://ugabackend.onrender.com/quiz/answer", {
      question,
      answer: selectedOption
    })
    .then(response => {
      setResultMessage(response.data.message);
      setSelectedAnswers(prev => ({ ...prev, [question]: selectedOption }));
    })
    .catch(error => console.error("Error checking answer:", error));
  };

  return (
    <main className="signup-page">
      <div className="logo-container">
        <Logo />
      </div>

      <h1>Financial Literacy Quiz</h1>

      {/* Quiz Categories */}
      <h2>Select a Category</h2>
      {categories.length > 0 ? (
        categories.map(category => (
          <button key={category} onClick={() => fetchQuiz(category)}
              style={{ margin: "10px", padding: "10px", cursor: "pointer" }}>
              {category}
          </button>
        ))
      ) : (
        <p>Loading categories...</p>
      )}

      {/* Quiz Questions */}
      {selectedCategory && <h2>{selectedCategory} Quiz</h2>}
      {quiz.map((q, index) => (
        <div key={index} style={{ marginBottom: "20px", border: "1px solid gray", padding: "10px", borderRadius: "8px" }}>
          <h3>{q.financial_literacy_quiz}</h3>
          {[q.option1, q.option2, q.option3, q.option4].map((option, idx) => (
            <button key={idx} 
                onClick={() => submitAnswer(q.financial_literacy_quiz, option)}
                style={{ margin: "5px", padding: "8px", cursor: "pointer",
                         backgroundColor: selectedAnswers[q.financial_literacy_quiz] === option ? "lightblue" : "white" }}>
                {option}
            </button>
          ))}
        </div>
      ))}

      {/* Result Message */}
      {resultMessage && <h3 style={{ color: resultMessage === "Correct!" ? "green" : "red" }}>{resultMessage}</h3>}
    </main>
  );
};
