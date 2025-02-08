import React from 'react'
import { useState } from 'react';
import './ViewRoom.css';

function ViewRoom() {
  const [hover, setHover] = useState(false);

  return (
    <main className="view-room">

<svg className={`lamp-border ${hover && 'glow'}`} width="105" height="83" viewBox="0 0 105 83" fill="none" xmlns="http://www.w3.org/2000/svg">
<path onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} d="M1 66.5V81L104 82V66.5H99L98 52.5H95.5V26H86.5V14H80V2.5L20.5 1V14H12V26H7V66.5H1Z" fill="transparent" stroke="transparent"/>
</svg>

    </main>
  )
}

export default ViewRoom