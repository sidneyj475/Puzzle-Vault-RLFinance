import React, { useState } from 'react';
import ImageContainer from './ImageContainer'; 
import Button from '../../components/button';

// Import your Modal
import Modal from '../../modals/Modal';

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
  // For switching among room types
  const [index, setIndex] = useState(0);

  // For modal control
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Example: store the selected image info if you want to show it in the modal
  const [selectedImage, setSelectedImage] = useState(null);

  // Decrement index, but not below 0
  const handlePrev = () => {
    setIndex((currentIndex) => Math.max(currentIndex - 1, 0));
  };

  // Increment index, but not above 2
  const handleNext = () => {
    setIndex((currentIndex) => Math.min(currentIndex + 1, 2));
  };

  // If you want to open the modal and show info about the clicked image
  const handleImageClick = (img) => {
    setSelectedImage(img);
    setIsModalOpen(true);
    // If you want to redirect: window.location.href = path
    // But presumably you want a modal for now
  };

  // Close modal callback
  const closeModal = () => {
    setIsModalOpen(false);
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
            // Open modal on click
            onClick={() => handleImageClick(imgObj)}
          />
        ))}

        <Button onClick={handleNext} className="nav-button nav-button--next">
          &rarr;
        </Button>
      </div>

      {/* Use the Modal here */}
      <Modal
        show={isModalOpen}
        onCancel={closeModal}  // needed for the backdrop click as well
        header="Room Details"
        footer={(
          <Button onClick={closeModal}>Close</Button>
        )}
      >
        {/* Example content inside the modal */}
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
