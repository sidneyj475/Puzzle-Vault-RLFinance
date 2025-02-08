import React, { useState } from 'react';
import ImageContainer from './ImageContainer'; 
import Button from '../../components/button';
import Modal from '../../modals/Modal';
import Header from '../Room/Header'
// Images
import roomImage1 from '../../assets/AdobeStock_701512458.jpeg';
import roomImage2 from '../../assets/AdobeStock_701984883.jpeg';
import roomImage3 from '../../assets/AdobeStock_845835364.jpeg';

import suiteImage1 from '../../assets/AdobeStock_846423919.jpeg';
import suiteImage2 from '../../assets/AdobeStock_937072431.jpeg';
import suiteImage3 from '../../assets/AdobeStock_845835364.jpeg';

import deluxeImage1 from '../../assets/AdobeStock_1107548196.jpeg';
import deluxeImage2 from '../../assets/AdobeStock_879761973.jpeg';
import deluxeImage3 from '../../assets/AdobeStock_1107548196.jpeg';

function RoomSelectPage() {
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePrev = () => {
    setIndex((currentIndex) => Math.max(currentIndex - 1, 0));
  };

  const handleNext = () => {
    setIndex((currentIndex) => Math.min(currentIndex + 1, 2));
  };

  const handleImageClick = (img) => {
    setSelectedImage(img);
    setIsModalOpen(true);
  };

  // Close modal callback
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // “Enter” action callback — customize as needed
  const enterModal = () => {
    if (selectedImage) {
      console.log('Entering room:', selectedImage.path);
      window.location.href = selectedImage.path;
    } else {
      console.log('No image selected');
    }
  };

  // Arrays of images
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

        {imageArrays[index].map((imgObj, idx) => (
          <ImageContainer
            key={idx}
            src={imgObj.image}
            alt="Image Couldn't Load"
            onClick={() => handleImageClick(imgObj)}
          />
        ))}

        <Button onClick={handleNext} className="nav-button nav-button--next">
          &rarr;
        </Button>
      </div>

      {/* Modal */}
      <Modal
        show={isModalOpen}
        onCancel={closeModal}
        header="Room Details"
        /* Provide both buttons in the footer */
        footer={
          <>
            <Button onClick={enterModal}>Enter</Button>
            <Button onClick={closeModal}>Close</Button>
          </>
        }
      >
        {selectedImage ? (
          <div>
            <h2>Selected Image Path</h2>
            <p>{selectedImage.path}</p>
            <img
              src={selectedImage.image}
              alt="Selected"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        ) : (
          <p>No image selected.</p>
        )}
      </Modal>
    </>
  );
}

export default RoomSelectPage;
