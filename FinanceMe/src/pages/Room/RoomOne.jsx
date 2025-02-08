import React, { useState, useEffect } from 'react';
import './RoomOne.css';
import QuestionModal from '../../modals/QuestionModal';

function RoomOne() {
  const [hover, setHover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Keep track of how many correct answers the user has.
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Whether to show the lamp (SVG) or not.
  const [showLamp, setShowLamp] = useState(true);

  // For this example, let's assume we have a single correct answer: "Option B".
  const CORRECT_ANSWER = 'Option B';

  useEffect(() => {
    let secondsElapsed = 0;

    const interval = setInterval(() => {
      secondsElapsed += 1;
      console.log(`Timer: ${secondsElapsed} second(s)`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleQuestionSubmit = (selectedOption) => {
    console.log('Form submitted. The user selected:', selectedOption);
    
    // Check if the selected option is correct
    if (selectedOption === CORRECT_ANSWER) {
      setCorrectAnswers((prevCount) => prevCount + 1);
      setShowLamp(false); // Hides the lamp if the answer is correct
      console.log('Correct answer!');
    } else {
      console.log('Wrong answer!');
    }

    // Close the modal after submission
    setIsModalOpen(false);
  };

  return (
    <main className="view-room">
      {/* Only render the SVG if showLamp is true */}
      {showLamp && (
        <svg
          className={`lamp-border ${hover ? 'glow' : ''}`}
          width="105"
          height="83"
          viewBox="0 0 105 83"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleOpenModal}
            d="M1 66.5V81L104 82V66.5H99L98 52.5H95.5V26H86.5V14H80V2.5L20.5 1V14H12V26H7V66.5H1Z"
            fill="transparent"
            stroke="transparent"
          />
        </svg>
      )}

      <QuestionModal
        show={isModalOpen}
        onCancel={handleCloseModal}
        question="Which is the correct answer?"
        options={['Option A', 'Option B', 'Option C', 'Option D']}
        onSubmit={handleQuestionSubmit}
      />
    </main>
  );
}

export default RoomOne;
