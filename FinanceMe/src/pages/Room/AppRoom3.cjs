// appRoom3.cjs
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));

const app = express();
const PORT = 3001; 

app.use(cors()); // allow cross-origin requests (React on :3000 -> Node on :3001)

// 1) GET categories from your backend (using Axios)
async function fetchCategories() {
  const url = 'https://ugabackend.onrender.com/quiz/categories';
  const response = await axios.get(url);
  return response.data.categories; // e.g. [ "Balance Sheet Basics", "Balance Sheet Calculation", ... ]
}

// 2) GET raw quiz data for a particular category (using fetch)
async function fetchQuizDataForCategory(category) {
  const encoded = encodeURIComponent(category);
  const url = `https://ugabackend.onrender.com/quiz/${encoded}`;

  const response = await fetch(url);
  const data = await response.json();
  return data; // typically an array of objects
}

// 3) Convert raw data -> desired shape
function parseQuizItems(rawQuizArray) {
  return rawQuizArray.map((item) => ({
    question: item.financial_literacy_quiz,
    options: [item.option1, item.option2, item.option3, item.option4],
    correctAnswer: item.answer,
  }));
}

// 4) New endpoint for Room3: /api/quizdata/room3
app.get('/api/quizdata/room3', async (req, res) => {
  try {
    const categories = await fetchCategories();

    const allQuizzes = {};
    for (const cat of categories) {
      const rawData = await fetchQuizDataForCategory(cat);
      const parsedQuiz = parseQuizItems(rawData);
      allQuizzes[cat] = parsedQuiz;
    }

    return res.json({
      success: true,
      categories,
      quizzes: allQuizzes,
    });
  } catch (error) {
    console.error('Error in /api/quizdata/room3:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Room3 server running on http://localhost:${PORT}`);
});
