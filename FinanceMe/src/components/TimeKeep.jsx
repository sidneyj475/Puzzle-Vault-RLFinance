import React from 'react'
import './timekeep.css'

function TimeKeep({totalSeconds}) {

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return <p className="time-keep">{minutes} min {seconds} sec</p>;
}

export default TimeKeep