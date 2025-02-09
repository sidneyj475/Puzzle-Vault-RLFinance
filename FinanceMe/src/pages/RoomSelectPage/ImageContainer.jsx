import React from 'react';
import PropTypes from 'prop-types';
import './ImageContainer.css';
import Star from '../../assets/CuteStarSprite.png';

function ImageContainer({ src, alt, onClick, difficulty, onLoad}) {
  return (
      <div className="room">
        <p>hello</p>
        <div className="room__description">
          <div className="room__description__content">
          <p>Difficulty: </p>
          {difficulty.map((diff, index) => {
            return <img style={{height: "70px", width: "70px"}}key={index} src={Star}/>
          })}
          </div>
        </div>
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
