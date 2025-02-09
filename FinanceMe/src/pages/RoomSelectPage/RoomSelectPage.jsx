import React, { useState, useEffect } from 'react';
import ImageContainer from './ImageContainer'; 
import Button from '../../components/button';
import Modal from '../../modals/Modal';
import RoomHeader from '../Room/RoomHeader'

import { useNavigate } from 'react-router-dom';
// Images
import roomImage1 from '../../assets/RoomThree.jpeg';
import roomImage2 from '../../assets/AdobeStock_701512458.jpeg';
import roomImage3 from '../../assets/AdobeStock_846423919.jpeg';


import './RoomSelectPage.css';

function RoomSelectPage() {

  const navigate = useNavigate();

  const handleImageClick = (path) => {
    navigate(path);
  };

  const roomImages = [
    { 
      image: roomImage1, 
      path: "/path-to-room1",
      difficulty: [1] // One star
    },
    { 
      image: roomImage2, 
      path: "/path-to-room2",
      difficulty: [1, 1] // Two stars
    },
    { 
      image: roomImage3, 
      path: "/path-to-room3",
      difficulty: [1, 1, 1] // Three stars
    },
  ];


  return (
    <main className="room-select-page">
      <h1>Select Difficulty</h1>

      <Button className="room-select-page__back-button" onClick={()=> {navigate('/landingpage')}}>Back</Button>
      
      <div className="room-select-page__carousel">
        {roomImages.map((imgObj, idx) => (
          <ImageContainer
            key={idx}
            src={imgObj.image}
            alt="Image Couldn't Load"
            difficulty={imgObj.difficulty}
            onClick={() => handleImageClick(imgObj.path)}
            onLoad={() => setImageCount(imageCount + 1)
            }
          />
        ))}
      </div>
    </main>
  );
}

export default RoomSelectPage;
