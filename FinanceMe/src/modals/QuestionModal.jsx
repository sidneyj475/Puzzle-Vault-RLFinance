import React, { useState } from 'react';
import Modal from './Modal';
import PropTypes from 'prop-types';
import './QuestionModal.css';

const QuestionModal = ({
  show,
  onCancel,
  question,
  options,
  onSubmit, 
  headerClass,
  contentClass,
  footerClass,
  errorMessage,  // <-- new
  ...rest
}) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // If there's a prop called onSubmit, call it with the selected option
    if (onSubmit) {
      onSubmit(selectedOption);
    }
  };

  return (
    <Modal
      show={show}
      // Remove onCancel so background clicks won't close it
      // or you can pass onCancel={null} if your Modal supports that
      className="question-modal"
      headerClass={headerClass}
      contentClass={contentClass}
      footerClass={footerClass}
      {...rest}
      
      // Title at the top
      header={<span>Select an Answer</span>}

      // NO footer (remove the "Close" button) so they can't dismiss it
      footer={null}
    >
      <div className="question-modal__content">
        <h2 className="question-title">{question}</h2>

        {/* Display an error if user is incorrect */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleFormSubmit}>
          <div className="question-options">
            {options.map((option, index) => (
              <label key={index} style={{ display: 'block', marginBottom: '8px' }}>
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedOption === option}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                {option}
              </label>
            ))}
          </div>

          {/* Only way out is to submit the correct answer */}
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

QuestionModal.propTypes = {
  show: PropTypes.bool.isRequired,
  // onCancel is optional now if you want to remove it
  question: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  onSubmit: PropTypes.func,
  errorMessage: PropTypes.string,  // added
  headerClass: PropTypes.string,
  contentClass: PropTypes.string,
  footerClass: PropTypes.string,
};

QuestionModal.defaultProps = {
  question: '',
  options: [],
  errorMessage: '',
};

export default QuestionModal;
