import React from 'react'
import './QuitGame.css'
import { useNavigate } from 'react-router-dom'

function QuitGame() {

const navigate = useNavigate();

  return (
    <div className="quit-game" onClick={() => {navigate('/landingpage')}}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path fill="white" d="M38 24H10M10 24L24 38M10 24L24 10" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <p>Quit</p>
    </div>
  )
}

export default QuitGame