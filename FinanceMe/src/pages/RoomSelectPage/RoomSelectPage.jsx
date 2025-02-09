import React, { useState } from 'react';
import ImageContainer from './ImageContainer'; 
import Button from '../../components/button';
import Modal from '../../modals/Modal';
import Header from '../Room/Header'

import { useNavigate } from 'react-router-dom';
// Images
import roomImage1 from '../../assets/AdobeStock_701984883.jpeg';
import roomImage2 from '../../assets/AdobeStock_701512458.jpeg';
import roomImage3 from '../../assets/AdobeStock_846423919.jpeg';

import suiteImage1 from '../../assets/ViewRoom.jpeg';
import suiteImage2 from '../../assets/AdobeStock_937072431.jpeg';
import suiteImage3 from '../../assets/AdobeStock_845835364.jpeg';

import deluxeImage1 from '../../assets/AdobeStock_1107548196.jpeg';
import deluxeImage2 from '../../assets/AdobeStock_879761973.jpeg';
import deluxeImage3 from '../../assets/AdobeStock_1107548196.jpeg';
import './RoomSelectPage.css';

function RoomSelectPage() {
  const [index, setIndex] = useState(0);
  const [j, setJ] = useState(0);




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
      
      <div className="room-select-page__carousel">
        {roomImages.map((imgObj, idx) => (
          <ImageContainer
            key={idx}
            src={imgObj.image}
            alt="Image Couldn't Load"
            difficulty={imgObj.difficulty}
            onClick={() => handleImageClick(imgObj.path)}
          />
        ))}
      </div>
    </main>
  );
}

export default RoomSelectPage;
