import { useState } from "react";
import "./ObjectBorder.css";

function ObjectBorder({ 
  svgPath, 
  width, 
  height, 
  className = "", 
  viewBox, 
  onClick, 
  disabled = false 
}) {
  // We only use hover state if it's not disabled
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    if (!disabled) {
      setHover(true);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHover(false);
    }
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        d={svgPath}
        fill="transparent"
      />
    </svg>
  );
}

export default ObjectBorder;
