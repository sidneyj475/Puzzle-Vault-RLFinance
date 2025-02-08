import React, { useState } from 'react';
import Modal from './Modal';
import PropTypes from 'prop-types';

const QuestionModal = ({
  show,
  onCancel,
  question,
  options,
  onOptionSelect,
  headerClass,
  contentClass,
  footerClass,
  ...rest
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (onOptionSelect) {
      onOptionSelect(option);
    }
  };

  return (
    <Modal
      show={show}
      onCancel={onCancel}
      // You can customize these classes or pass them via props
      className="question-modal"
      headerClass={headerClass}
      contentClass={contentClass}
      footerClass={footerClass}
      // If you want to pass other props down, do so here
      {...rest}
      // The `header` prop here will display in your Modal's header
      header={<span>Select an Answer</span>}
      // The `footer` prop here will display in your Modal's footer
      footer={
        <button onClick={onCancel} className="modal-close-btn">
          Close
        </button>
      }
    >
      {/* The children passed to Modal */}
      <div className="question-modal__content">
        {/* Display the question */}
        <h2 className="question-title">{question}</h2>

        {/* Render the four (or more) options */}
        <div className="question-options">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`option-btn ${
                selectedOption === option ? 'option-btn--selected' : ''
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

QuestionModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  question: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  onOptionSelect: PropTypes.func,
  headerClass: PropTypes.string,
  contentClass: PropTypes.string,
  footerClass: PropTypes.string,
};

QuestionModal.defaultProps = {
  question: '',
  options: [],
};

export default QuestionModal;
