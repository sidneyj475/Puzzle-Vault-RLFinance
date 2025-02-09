
const express = require('express');
const axios = require('axios');
const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));
const cors = require('cors');


const app = express();

app.use(cors()); 
const PORT = 3001; 

// 1) GET categories from your backend (using Axios)
async function fetchCategories() {
  const url = 'https://ugabackend.onrender.com/quiz/categories';
  const response = await axios.get(url);
  return response.data.categories; // [ "Balance Sheet Basics", "Balance Sheet Calculation", ... ]
}

// 2) GET raw quiz data for a particular category (using fetch)
async function fetchQuizDataForCategory(category) {
  const encoded = encodeURIComponent(category); // Handle spaces, special chars
  const url = `https://ugabackend.onrender.com/quiz/${encoded}`;

  const response = await fetch(url);
  const data = await response.json();
  return data; // Typically an array of objects
}

// 3) Convert raw data -> desired shape: { question, options, correctAnswer }
function parseQuizItems(rawQuizArray) {
  // Each item has:
  //   financial_literacy_quiz (the question)
  //   option1, option2, option3, option4 (the options)
  //   answer (the correct one)
  // We'll transform that into:
  // {
  //   question: "Which of the following is considered ...",
  //   options: ["A", "B", "C", "D"],
  //   correctAnswer: "C"
  // }
  return rawQuizArray.map((item) => ({
    question: item.financial_literacy_quiz,
    options: [item.option1, item.option2, item.option3, item.option4],
    correctAnswer: item.answer,
  }));
}

// 4) An endpoint that returns *all* categories + their quizzes
app.get('/api/quizdata', async (req, res) => {
  try {
    // 4a) Get all categories
    const categories = await fetchCategories();

    // We'll store the final data in an object keyed by category
    // e.g. {
    //   "Balance Sheet Basics": [ { question, options, correctAnswer }, ... ],
    //   "Balance Sheet Calculation": [...],
    //   ...
    // }
    const allQuizzes = {};

    // 4b) Loop through each category, fetch + parse its quiz
    for (const cat of categories) {
      const rawData = await fetchQuizDataForCategory(cat);
      const parsedQuiz = parseQuizItems(rawData);
      allQuizzes[cat] = parsedQuiz;
    }

    // 4c) Send the aggregated data as JSON
    return res.json({
      success: true,
      categories,
      quizzes: allQuizzes,
    });
  } catch (error) {
    console.error('Error in /api/quizdata:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
