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
      onCancel={onCancel}
      className="question-modal"
      headerClass={headerClass}
      contentClass={contentClass}
      footerClass={footerClass}
      {...rest}
      header={<span>Select an Answer</span>}
      footer={
        <button onClick={onCancel} className="modal-close-btn">
          Close
        </button>
      }
    >
      <div className="question-modal__content">
        <h2 className="question-title">{question}</h2>

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
  onCancel: PropTypes.func.isRequired,
  question: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  onSubmit: PropTypes.func,
  headerClass: PropTypes.string,
  contentClass: PropTypes.string,
  footerClass: PropTypes.string,
};

QuestionModal.defaultProps = {
  question: '',
  options: [],
};

export default QuestionModal;
