import React, { useState, useEffect } from 'react';
import ImageContainer from './ImageContainer'; 
import Button from '../../components/button';
import Modal from '../../modals/Modal';
import RoomHeader from '../Room/RoomHeader'

import { useNavigate } from 'react-router-dom';
// Images
import roomImage1 from '../../assets/AdobeStock_701512458.jpeg';
import roomImage2 from '../../assets/RoomThree.jpeg';
import roomImage3 from '../../assets/AdobeStock_845835364.jpeg';


import './RoomSelectPage.css';

function RoomSelectPage() {

  const navigate = useNavigate();

  const handleImageClick = (path) => {
    navigate(path);
  };

  const roomImages = [
    { image: roomImage1, path: "/path-to-room1" },
    { image: roomImage2, path: "/path-to-room2" },
    { image: roomImage3, path: "/path-to-room3" },
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
            difficulty={[1, 1, 1]}
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
