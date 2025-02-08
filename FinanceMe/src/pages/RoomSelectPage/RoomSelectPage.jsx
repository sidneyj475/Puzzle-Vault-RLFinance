import React from 'react';
import ImageContainer from './ImageContainer'; 
import Button from '../../components/button';
import roomImage1 from '../../assets/AdobeStock_701512458.jpeg';
import roomImage2 from '../../assets/AdobeStock_701984883.jpeg';
import roomImage3 from '../../assets/AdobeStock_845835364.jpeg';

import suiteImage1 from '../../assets/AdobeStock_846423919.jpeg';
import suiteImage2 from '../../assets/AdobeStock_937072431.jpeg';
import suiteImage3 from '../../assets/AdobeStock_845835364.jpeg';

import deluxeImage1 from '../../assets/AdobeStock_1107548196.jpeg';
import deluxeImage2 from '../../assets/AdobeStock_879761973.jpeg';
import deluxeImage3 from '../../assets/AdobeStock_1107548196.jpeg';

import { useState } from 'react';

function RoomSelectPage() {

  const [index, setIndex] = useState(0);
  const [j, setJ] = useState(0);

// Decrement index, but not below 0
const handlePrev = () => {
  setIndex((currentIndex) => Math.max(currentIndex - 1, 0));
};

// Increment index, but not above 3
const handleNext = () => {
  setIndex((currentIndex) => Math.min(currentIndex + 1, 2));
};

const handleImageClick = (path) => {
  window.location.href = path;
};

  const roomImages = [
    { image: roomImage1, path: "path-to-room1" },
    { image: roomImage2, path: "path-to-room2" },
    { image: roomImage3, path: "path-to-room3" },
  ];
  
  const suiteImages = [
    { image: suiteImage1, path: "path-to-suite1" },
    { image: suiteImage2, path: "path-to-suite2" },
    { image: suiteImage3, path: "path-to-suite3" },
  ];
  
  const deluxeImages = [
    { image: deluxeImage1, path: "path-to-deluxe1" },
    { image: deluxeImage2, path: "path-to-deluxe2" },
    { image: deluxeImage3, path: "path-to-deluxe3" },
  ];
  const imageArrays = [roomImages, suiteImages, deluxeImages];

  return (
    <>
      <header>Asset Management</header>

      <div className="room-select-page">
        <Button onClick={handlePrev} className="nav-button nav-button--prev">
          &larr;
        </Button>


        {imageArrays[index].map((img, index) => (
          <ImageContainer
            key={index}
            src={img.image}
            alt={`Image Couldn't Load`}
            onClick={() => handleImageClick(img.path)}

          />
      ))}

        <Button onClick={handleNext} className="nav-button nav-button--next">
          
          &rarr;
        </Button>
      </div>
    </>
  );
}

export default RoomSelectPage;
