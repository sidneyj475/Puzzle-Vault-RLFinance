import React from 'react';
import PropTypes from 'prop-types';
import './ImageContainer.css';

function ImageContainer({ src, alt, onClick}) {
  return (
      <div className="room">
        <img src={src} alt={alt} onClick={onClick} />
      </div>
  );
}

ImageContainer.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
};

ImageContainer.defaultProps = {
  alt: 'Image'
};

export default ImageContainer;
