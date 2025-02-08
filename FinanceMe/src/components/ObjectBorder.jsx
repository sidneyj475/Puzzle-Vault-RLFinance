import { useState } from "react";
import "./ObjectBorder.css";

function ObjectBorder({ svgPath, width, height, className = "", viewBox, onClick}) {
  const [hover, setHover] = useState(false);

  return (
    <svg
      className={`item-border ${hover ? "glow" : ""} ${className}`}
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        d={svgPath}
        fill="transparent"
        onClick={onClick}
      />
    </svg>
  );
}

export default ObjectBorder;