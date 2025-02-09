import React from 'react'
import PixelAnimation from './PixelAnimation.jsx'
import coin1 from '../assets/coins/coin1.svg';
import coin2 from '../assets/coins/coin2.svg';
import coin3 from '../assets/coins/coin3.svg';
import coin4 from '../assets/coins/coin4.svg';
import coin5 from '../assets/coins/coin5.svg';
import coin6 from '../assets/coins/coin6.svg';
import './logo.css'

function Logo() {

  const images = [coin1, coin2, coin3, coin4, coin5, coin6];

  return (
    <div className="logo">
      <p>Puzzle&nbsp;</p>
      <div className="animation-container">
        <PixelAnimation images={images} />
      </div>
      <p >&nbsp;Vault</p>
    </div>
  )
}

export default Logo