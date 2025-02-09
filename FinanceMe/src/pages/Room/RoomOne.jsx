import React, { useState, useEffect } from 'react';
import './RoomOne.css';
import QuestionModal from '../../modals/QuestionModal'; 
import ObjectBorder from '../../components/ObjectBorder.jsx';
import Modal from '../../modals/Modal.jsx'; // Import your generic Modal
import QuitGame from '../../components/QuitGame.jsx';

function RoomOne() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);

  // Track start time
  const [startTime, setStartTime] = useState(null);

  // Manage “congratulations” modal
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);

  // Track whether each item has been answered
  const [answeredItems, setAnsweredItems] = useState({
    lamp: false,
    bookshelf: false,
    chair: false,
    clock: false,
    deskplant: false,
    monitor: false,
    painting: false,
    shortcactus: false,
    tallcactus: false,
    trashcan: false,
  });

  // Store all questions (fetched from server) in this state
  const [questionPool, setQuestionPool] = useState([]);
  // Current question displayed in the modal
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const [errorMessage, setErrorMessage] = useState('');

  // OPTIONAL: Simple timer example (already in your code).
  // This just prints out every second, but does not affect the final logic.
  useEffect(() => {
    let secondsElapsed = 0;
    const interval = setInterval(() => {
      secondsElapsed += 1;
      console.log(`Timer: ${secondsElapsed} second(s)`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Track the actual start time for completion logging
  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  // Fetch quiz data on mount
  useEffect(() => {
    fetch('http://localhost:3001/api/quizdata') // or your actual endpoint
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Flatten all categories into a single array
          const allQuestions = [];
          for (let cat in data.quizzes) {
            allQuestions.push(...data.quizzes[cat]);
          }
          setQuestionPool(allQuestions);
          console.log('Fetched question pool:', allQuestions);
        } else {
          console.error('Quiz data fetch returned an error:', data);
        }
      })
      .catch((err) => console.error('Error fetching quiz data:', err));
  }, []);

  // When user clicks an object
  const handleOpenModal = (objectKey) => {
    // If that object was already answered, do nothing
    if (answeredItems[objectKey]) return;

    // If we've used up all questions
    if (questionPool.length === 0) {
      alert('No more questions available!');
      return;
    }

    // Pick a random question from questionPool
    const randomIndex = Math.floor(Math.random() * questionPool.length);
    const randomQuestion = questionPool[randomIndex];

    setCurrentQuestion(randomQuestion);
    setSelectedObject(objectKey);
    setErrorMessage('');
    setIsModalOpen(true);
  };

  // Handle user's answer
  const handleQuestionSubmit = (selectedOption) => {
    console.log('User selected:', selectedOption);

    if (!currentQuestion) return; // Safety check

    if (selectedOption === currentQuestion.correctAnswer) {
      console.log('Correct answer!');

      // Remove this question from questionPool so it won't be repeated
      setQuestionPool((prevPool) =>
        prevPool.filter((q) => q.question !== currentQuestion.question)
      );

      // Mark only that object as answered
      setAnsweredItems((prev) => {
        const updated = { ...prev, [selectedObject]: true };

        // Check if all items are now answered
        const allAnswered = Object.values(updated).every(Boolean);
        if (allAnswered) {
          const endTime = Date.now();
          const totalTimeSeconds = (endTime - startTime) / 1000;
          console.log(`User took ${totalTimeSeconds} seconds to finish Room One.`);
          setIsCompletedModalOpen(true);
        }

        return updated;
      });

      // Close the question modal
      setIsModalOpen(false);
      setSelectedObject(null);
      setErrorMessage('');
      setCurrentQuestion(null);
    } else {
      console.log('Wrong answer!');
      // Keep the modal open and show error
      setErrorMessage('That is incorrect. Please try again!');
    }
  };

  // Close modal helper (though currently we block manual close until correct)
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedObject(null);
    setErrorMessage('');
    setCurrentQuestion(null);
  };

  return (
    <main className="room-one">

      <QuitGame />

      {/* Lamp */}
      <ObjectBorder
        onClick={() => handleOpenModal('lamp')}
        disabled={answeredItems.lamp}
        svgPath="M1 66.5V81L104 82V66.5H99L98 52.5H95.5V26H86.5V14H80V2.5L20.5 1V14H12V26H7V66.5H1Z"
        width="105"
        height="83"
        viewBox="0 0 105 83"
        className="room-one__lamp"
      />

      {/* Bookshelf */}
      <ObjectBorder
        onClick={() => handleOpenModal('bookshelf')}
        disabled={answeredItems.bookshelf}
        svgPath="M1 1H27.5H29H59V11.5H67.5V28.5H64.5L63 32H59V35.5L57.5 40L52.5 38H47.5L48.5 42.5L47.5 45V48L48.5 53.5V55.5L50 64.5H38.5H1V1Z"
        width="68"
        height="65"
        viewBox="0 0 68 65"
        className="room-one__bookshelf"
      />

      {/* Chair */}
      <ObjectBorder
        onClick={() => handleOpenModal('chair')}
        disabled={answeredItems.chair}
        svgPath="M16.5 193.5L79 196V198.5H81.5V201.5H92.5V203H99L100 185.5H107V175H109V162.5H111.5L113 156H116L114.5 117H121V101.5H122.5V88.5H125V87H130.5V78.5H152.5V75L175.5 76L177 60L178.5 58L180 54.5H164.5V58H151.5V54.5L147.5 53.5V11H150.5L151.5 9H153.5V0.5H198.5V23.5L200.5 25V54.5H185.5V76H189.5V73H213.5L214.5 70.5H238V73H242L246.5 78.5V98H245V109.5H242L243 115L240.5 116V124.5H238V128.5L236.5 130V136.5L235 137.5V149H231.5L230.5 167V172.5H228V179L226 180.5V191L225 192.5V198.5H223.5V212.5L220.5 213.5V219.5L219.5 232.5L216.5 233.5V234.5V241V243.5V258H213L209 268L203.5 266.5V265H195.5L194.5 268L190.5 269H189.5H180.5V273L176.5 274L175.5 275L165 274L149.5 276H148H146V284.5L130 286V293.5H124L123.5 301H127.5V345.5L130 346.5L131.5 347.5H137L143 349V350.5L153 350L162 350.5L162.5 352H164H168.5H172.5V353H180L181 355.5L183.5 356H185L198 356.5V362L197.5 363.5L198 365L198.5 366.5L197.5 379.5L195.5 379L196 381H186L185.5 379.5L181.5 379L181 376H179L180 365H177.5L177 366H168.5V366.5H154.5L154 367.5H148L155.5 373.5L167 380C169.167 381.333 173.5 384.2 173.5 385C173.5 385.8 173.833 387.333 174 388L175 393.5H171V396L171.5 397V399H174C173.833 402.167 173.5 408.6 173.5 409C173.5 409.4 172.167 409.167 171.5 409V413.5H165.5L165 414.5H158V412.5H155.5V400L156 391.5H154.5L124 370.5L123.5 368.5H114.5V379L104 379.5V378H99.5L99 366H88V367.5H74.5L74 369L63.5 369.5V371H56L56.5 372H49.5L50 373H44V374.5H32V375.5L34.5 376V378.5H37V391H34.5L34 392.5H30.5V394H24.5V392H20.5L20 390.5H19L18 384.5H16.5V377.5H17.5L18 371H20L20.5 363.5H27H31.5L32 362.5L35 362L34.5 360H39.5L40 359.5H46.5V357.5H51L51.5 356.5V355L50 354L50.5 344.5H48.5L45.5 343.5V338.5L47.5 338H50L51.5 336L54 337V335H62.5V337H64.5V338H70L75 339H82L84 341H88H106.5L107 306H100.5L97.5 305L96.5 306L91.5 303.5L90.5 301L82 302V303.5H79.5V306H66.5H62.5V302.5H67.5V300H71.5L72 300.5H75L77 299.5L77.5 292L56.5 291.5L57 287L40.5 286H31L30.5 279.5H25L22.5 277.5L22 275H19.5L19 268L13 267H1.5L0.5 260.5V243.5H2L3 240.5H5V239H12.5L13 236H19V211.5H12.5L13.5 206.5H11V198.5H13.5V195.5L16.5 196V193.5Z"
        width="247"
        height="415"
        viewBox="0 0 247 415"
        className="room-one__chair"
      />

      {/* Clock */}
      <ObjectBorder
        onClick={() => handleOpenModal('clock')}
        disabled={answeredItems.clock}
        svgPath="M22.5 0.5H42.5H43V8H46V11H50L50.5 12H55V16.5H58V19.5H60.5L61 45H59.5V49H55V53H52V56H51H48.5V60H46.5V61V63L44.5 63.5L43 65.5H22L20 65L19.5 62.5H17.5V59.5L14 59V56H13H11.5V53.5H9V50.5H6.5V49H4.5V47H1V24L4.5 21V19H7V17H9L10.5 14.5H12.5V11H16L17 8H20.5V5.5H22.5V0.5Z"
        width="62"
        height="66"
        viewBox="0 0 62 66"
        className="room-one__clock"
      />

      {/* Desk Plant */}
      <ObjectBorder
        onClick={() => handleOpenModal('deskplant')}
        disabled={answeredItems.deskplant}
        svgPath="M4 58.5V46.5V45.5H13.5L15 44.5L15.5 42H11.5L9 39.5L8 38L4 37L2.5 35L1.5 32.5L1 30.5L2.5 28.5V27H5L6 28.5L10 30L12.5 31.5L13.5 30.5L12.5 25.5L11.5 23.5V20L10 17.5V14.5L15.5 15V16.5H17L19 18.5L19.5 13L21 11H23L25 9L27.5 5.5L30.5 4.5H34V1H37.5L38.5 3.5L39.5 4.5L37.5 6V8L36.5 10.5L35.5 11L36 13.5V15V20V27L38.5 28.5L40 27V22.5L41.5 18.5L43.5 16.5L46 18.5H46.5L48.5 20L49.5 21.5L51.5 22.5V24.5H46L45.5 26.5L46.5 30V35L48.5 36L52.5 34H54L51.5 39.5L48.5 40H46.5L46 42.5H50V44.5L48.5 45.5V46.5V49.5V59.5H45.5L46 61L45.5 62L43.5 67L42.5 68L41.5 71V74.5H15.5L14.5 72.5H11V69.5L9.5 63.5L6.5 60.5L4 58.5Z"
        width="55"
        height="75"
        viewBox="0 0 55 75"
        className="room-one__deskplant"
      />

      {/* Monitor */}
      <ObjectBorder
        onClick={() => handleOpenModal('monitor')}
        disabled={answeredItems.monitor}
        svgPath="M7.76305 1.92466H1V112.884H6.55867V116.027H9.15272H13.2291L13.507 116.49L62.516 115.658V131.007L67.2409 136H103.372V133.503L102.909 132.116L100.593 131.007L97.3504 128.51V127.401H94.7563V114.825L160.349 113.253V112.051H165.629V4.97603L166 3.77397V2.94178V1.55479L165.166 1H7.76305V1.92466Z"
        width="167"
        height="137"
        viewBox="0 0 167 137"
        className="room-one__monitor"
      />

      {/* Painting */}
      <ObjectBorder
        onClick={() => handleOpenModal('painting')}
        disabled={answeredItems.painting}
        svgPath="M87 109.5H4.5V2.5L6.5 1L87 2.5V3.5V4.5V109.5Z"
        width="92"
        height="118"
        viewBox="0 0 92 118"
        className="room-one__painting"
      />

      {/* Short Cactus */}
      <ObjectBorder
        onClick={() => handleOpenModal('shortcactus')}
        disabled={answeredItems.shortcactus}
        svgPath="M24.1618 93.9538H28.7574L32.1581 92.4769L36.9375 93.9538L35.8346 90.2615L32.1581 87.3077L30.8713 83.8H28.7574L24.1618 82.1385L16.8088 80.8462L14.6029 78.4462V75.5846L7.98529 73.9231V65.4308L5.41176 64.3231V61.3692L1 59.3385V45.4923L3.94118 46.9692V43.2769L7.06618 42.3538V33.5846V31V26.2H13.3162L14.6029 18.2615L16.8088 17.1538L19.75 15.3077L21.0368 12.7231H24.1618V7.73846H28.7574L33.261 5.52308L35.8346 7.73846V2.66154H41.9007L44.2904 5.52308L49.0699 1H57.8934V2.66154H61.9375V5.52308H63.9596V7.73846H71.4044L72.5074 9.95385H79.4926L81.3309 19.9231H89.2353V23.8H91.0735L92.7279 33.5846L97.1397 36.3538L98.9779 38.7538V46.9692L101 48.6308V67.2769H97.1397V69.6769V73L92.7279 73.9231L93.6471 82.1385H84.0882V85.8308H81.3309L82.6176 92.4769H85.1912L84.0882 131.892H82.6176V134.108V144.631L77.6544 146.292V148.508H73.6103V151H42.8199H36.7537L35.2831 148.508H30.5037L27.6544 133L26.1838 121.185L24.1618 100.415V93.9538Z"
        width="102"
        height="152"
        viewBox="0 0 102 152"
        className="room-one__shortcactus"
      />

      {/* Tall Cactus */}
      <ObjectBorder
        onClick={() => handleOpenModal('tallcactus')}
        disabled={answeredItems.tallcactus}
        svgPath="M41 239H47V231.5H34V226.5H31V219.5L30 218.5V210L31 209.5V207H23V204.5H18.5V200L15 200.5V195.5L13 194.5V179.5H22V182H30.5L31 183H33V188L35.5 188.5L36 200.5L37.5 200L39 199H41.5H43.5H47V189L48.5 185L47 178.5L45 176.5L41.5 177L41 174L36.5 173V170L34.5 169V165.5L32 166L33 156H29V148.5L31 148L32 146.5H34.5L35.5 148H39H43.5V151H44.5L46 149.5H48.5V137.5H44L44.5 133L37 132V127.5H31V122.5L26.5 121.5V98L23 97H16.5V94H13.5V76L9.5 77V75H7.5V72.5H3.5V67H1V59.5H2V56.5L4.5 56V41.5H6.5V37H14V35H29V38.5H32.5V40H34.5V46L35.5 46.5V56.5L34 56V67H35L36.5 69V70L38 71L40 69V61H43.5V56H48L48.5 55H53.5L54 37H45.5V33H42V29.5H38V27L35 26L35.5 3.5H38L39 1H58V5H61.5V11.5H63.5V31L61 32L61.5 34.5H60V38.5H63.5V33H70.5V27.5L84.5 27V31H89L90 35L93 36V40H94.5V56.5L96 56V64.5V88L94.5 89V96.5L92 97L91.5 99H90V103.5H85.5V106.5H79V110H67V126.5H65V130.5H63V133V135V137H78V140.5H84V146L87 146.5V148L89.5 149V156H85.5V160.5H87L88 168L85.5 167.5V170L83.5 170.5L82.5 174L80.5 173L81.5 178.5H78L77 195.5H80L79.5 193H83.5V188H85L85.5 174.5L89.5 174V169H105V196.5H102.5V197.5H93.5L91 195.5H85V200H78V204.5H85V201.5L91 200H98L101.5 201L105 202.5L106.5 210.5L105 216L102.5 218.5L101.5 222L98 225.5L95 229.5L91 228L89.5 225.5L87 224L82.5 223L81.5 218.5L80 215L77 214V239H84.5V240H99.5L100.5 242.5H101.5H109.5V243.5V245.5H114V259L111 260.5C110.2 260.9 109.667 262.333 109.5 263V277.5L106.5 280.5V318H103L102 324.5L98 328.5L87 329.5L70 330.5L52.5 329.5H44.5L38 328.5L36 326L32.5 324.5L28.5 320L27 315.5L25.5 311.5L24 277.5L22.5 272V263L20.5 261.5V259H16V241H20.5L27 240H32.5L34 239L40 240L41 239Z"
        width="115"
        height="331"
        viewBox="0 0 115 331"
        className="room-one__tallcactus"
      />

      {/* Trashcan */}
      <ObjectBorder
        onClick={() => handleOpenModal('trashcan')}
        disabled={answeredItems.trashcan}
        svgPath="M41.5 3.5V1H63.5V3.5H65.5V6.5H73V10H76.5V16.5H87V20L93 20.5L93.5 23L98 23.5V30.5L99.5 33.5V38.5L97 39.5L96 40.5V44.5L94.5 45.5V46.5V102.5L93 105.5V111L90 112.5L88 118L82.5 118.5L81.5 120.5L46 121.5H35.5V119.5L25.5 120.5V118H21.5V115.5H17.5L17 112.5L15 110.5L14 101.5V97L12.5 95.5H10L9.5 71L9 51.5L7.5 40.5L5.5 39.5V36.5H1V20.5H8V16.5H16V14.5H23.5V10H31H33V5L36.5 3.5H41.5Z"
        width="100"
        height="122"
        viewBox="0 0 100 122"
        className="room-one__trashcan"
      />

      {/* Question Modal */}
      <QuestionModal
        show={isModalOpen}
        onCancel={null} // Disables manual cancel
        question={currentQuestion ? currentQuestion.question : ''}
        options={currentQuestion ? currentQuestion.options : []}
        errorMessage={errorMessage}
        onSubmit={handleQuestionSubmit}
      />

      {/* Congratulations Modal */}
      <Modal
        show={isCompletedModalOpen}
        onCancel={() => setIsCompletedModalOpen(false)}  // or omit if you don't want manual close
        header="Congratulations!"
        footer={<button onClick={() => setIsCompletedModalOpen(false)}>Close</button>}
      >
        <p>You passed!</p>
      </Modal>

    </main>
  );
}

export default RoomOne;
