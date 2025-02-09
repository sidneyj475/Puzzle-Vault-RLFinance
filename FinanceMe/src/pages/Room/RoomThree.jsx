import React, { useState, useEffect } from 'react';
import './RoomThree.css';
import QuestionModal from '../../modals/QuestionModal.jsx'; 
import ObjectBorder from '../../components/ObjectBorder.jsx';
import Modal from '../../modals/Modal.jsx'; // the generic modal you've shown above

function RoomThree() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Track the quiz start time
  const [startTime, setStartTime] = useState(null);

  // Manage “congratulations” modal
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);

  // QUESTIONS
  const [questionPool, setQuestionPool] = useState([]);

  // Track which objects have been answered
  const [answeredItems, setAnsweredItems] = useState({
    coffeeMachine: false,
    coffeeMenu: false,
    coffeePot: false,
    plant: false,
    stool: false,
  });

  // Store the object key we are currently answering
  const [selectedObjectKey, setSelectedObjectKey] = useState(null);

  // Set the start time once the component mounts
  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  // Fetch questions once
  useEffect(() => {
    fetch('http://localhost:3001/api/quizdata/room3')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Flatten all categories
          const allQuestions = [];
          for (let cat in data.quizzes) {
            allQuestions.push(...data.quizzes[cat]);
          }
          setQuestionPool(allQuestions);
          console.log('Fetched questions for room3:', allQuestions);
        } else {
          console.error('Room3 fetch returned an error:', data.error);
        }
      })
      .catch((err) => console.error('Room3 fetch error:', err));
  }, []);

  // When an object is clicked
  const handleOpenModal = (objectKey) => {
    // If that object is already answered, do nothing
    if (answeredItems[objectKey]) return;

    // If no questions left, do nothing
    if (!questionPool.length) {
      alert('No questions available');
      return;
    }

    // Randomly pick a question
    const randIndex = Math.floor(Math.random() * questionPool.length);
    const question = questionPool[randIndex];

    // Show modal
    setSelectedObjectKey(objectKey);
    setCurrentQuestion(question);
    setIsModalOpen(true);
    setErrorMessage('');
  };

  // Only close if correct
  const handleQuestionSubmit = (selectedOption) => {
    if (!currentQuestion) return;

    if (selectedOption === currentQuestion.correctAnswer) {
      console.log('Correct answer!');

      // Mark object as answered
      setAnsweredItems((prev) => {
        const updated = {
          ...prev,
          [selectedObjectKey]: true,
        };
        // Check if all answered
        const allAnswered = Object.values(updated).every(Boolean);
        if (allAnswered) {
          // Calculate how long it took
          const endTime = Date.now();
          const totalTime = (endTime - startTime) / 1000; // in seconds
          console.log(`User took ${totalTime} seconds to finish Room 3.`);

          // Show final "congratulations" modal
          setIsCompletedModalOpen(true);
        }
        return updated;
      });

      // Close the question modal
      setIsModalOpen(false);
      setCurrentQuestion(null);
      setSelectedObjectKey(null);
      setErrorMessage('');
    } else {
      console.log('Wrong answer!');
      setErrorMessage('That is incorrect. Please try again!');
    }
  };

  return (
    <main className="room-three">
      {/* Coffee Machine */}
      <ObjectBorder
        onClick={() => handleOpenModal('coffeeMachine')}
        disabled={answeredItems.coffeeMachine}
        svgPath="M0.5 66V1H209.5V70.5H184.5V137.5H209.5V167.5C209.5 170.7 70.1667 168.833 0.5 167.5V137.5H24.5V70.5H0.5V66Z"
        width="210"
        height="170"
        viewBox="0 0 210 170"
        className="room-three__coffee-machine"
      />

      {/* Coffee Menu */}
      <ObjectBorder
        onClick={() => handleOpenModal('coffeeMenu')}
        disabled={answeredItems.coffeeMenu}
        svgPath="M0.5 4.5V5M0.5 5V216H6V221.5H10V227H15.5H700L705 225V221.5C706.667 222.167 710 223.1 710 221.5C710 219.9 710 217.167 710 216H715.5L713.5 0.5H416V32H422V37.5H427V42H431.5V46.5H435.5V51H440V55H444.5V61H449.5V64.5H454V71H458.5L459.5 74.5H463.5V84H458.5V89H444.5L445.5 93.5H426.5V97.5H417V102.5H397L397.5 98.5H388.5V93.5H369.5V89C364.833 89.3333 355.5 89.8 355.5 89C355.5 88.2 355.5 85.3333 355.5 84H350V74.5H355.5V70H361L360 65.5H364.5V61H369.5V56H374V51H378.5V46.5H383.5L383 41.5H388.5V37.5H393.5V32H397.5V0.5H0.5V5Z"
        width="716"
        height="228"
        viewBox="0 0 716 228"
        className="room-three__coffee-menu"
      />

      {/* Coffee Pot */}
      <ObjectBorder
        onClick={() => handleOpenModal('coffeePot')}
        disabled={answeredItems.coffeePot}
        svgPath="M34.5 9.5V2.5V0.5H80.5L82 9.5H100.5V24H104.5V20H133V24H138V29H142.5V35H147V62.5H138V72.5H128V75.5L124.5 77.5V81.5H120V85.5H104.5V95H100.5V100.5H95.5V105H90.5V110.5H19.5V105H15V100.5H10.5V95H6V85.5H0.5V53H6V45L10.5 43V35H19.5V29H15V19H24V24.5H29V11H38V6H42.5V1Z"
        width="148"
        height="111"
        viewBox="0 0 148 111"
        className="room-three__coffee-pot"
      />

      {/* Plant */}
      <ObjectBorder
        onClick={() => handleOpenModal('plant')}
        disabled={answeredItems.plant}
        svgPath="M42.5 1H52.5V6H48V10H52.5V19H57.5V29H61.5V24.5H66V38.5H62.5V42.5H71.5V47.5H75.5V52.5V85.5H71.5V100H66V119H62.5V123.5H15.5V119L10 118V109.5V101H5V85.5H0.5V71H5V66.5H0.5V57.5H10V52.5H5L6 44H10V38.5H6V33.5H19V29H15V19H24V24.5H29V11H38V6H42.5V1Z"
        width="76"
        height="124"
        viewBox="0 0 76 124"
        className="room-three__plant"
      />

      {/* Stool */}
      <ObjectBorder
        onClick={() => handleOpenModal('stool')}
        disabled={answeredItems.stool}
        svgPath="M44 1H161L162.5 5H171V11.5H175.5V61.5H171V78H175.5V110.5L180.5 112V147H185.5V182H189.5V215H195.5V253H199.5V285.5H189.5V258H185.5V237H110.5V253H113.5V285.5H104V263V258H101V263H95.5V281H86.5V258H90.5V238H15.5V260.5H9V281H0.5V258H6V220.5H11.5V186.5H16.5V153.5H19V116.5H24.5V82H29.25V61.5H24.5V17.5H29V12.5H34V7.5H44V1Z"
        width="200"
        height="286"
        viewBox="0 0 200 286"
        className="room-three__stool"
      />

      {/* The Question Modal */}
      <QuestionModal
        show={isModalOpen}
        onCancel={null} // No manual cancellation
        question={currentQuestion ? currentQuestion.question : ''}
        options={currentQuestion ? currentQuestion.options : []}
        errorMessage={errorMessage}
        onSubmit={handleQuestionSubmit}
      />

      {/* Completion Modal */}
      <Modal
        show={isCompletedModalOpen}
        onCancel={() => {
          // If you don't want them to close it, you can either remove this or do something else
          setIsCompletedModalOpen(false);
        }}
        header="Congratulations!"
        footer={<button onClick={() => setIsCompletedModalOpen(false)}>Close</button>}
      >
        <p>You passed!</p>
      </Modal>
    </main>
  );
}

export default RoomThree;
