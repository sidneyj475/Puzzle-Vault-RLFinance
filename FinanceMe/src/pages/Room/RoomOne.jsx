import React, { useState } from 'react';
import './RoomOne.css';
import QuestionModal from '../../modals/QuestionModal'; 

function RoomOne() {
  const [hover, setHover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleQuestionSubmit = (selectedOption) => {

    console.log('Form submitted. The user selected:', selectedOption);
    setIsModalOpen(false);

  };

  return (
    <main className="view-room">
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

