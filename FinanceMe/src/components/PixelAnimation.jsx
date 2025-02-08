import { useEffect, useState } from 'react';

export default function PixelAnimation({ images, interval = 100 }){
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const animation = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(animation);
  }, [images, interval]);

  return (
    <img
      src={images[index]}
      alt="Pixel Animation"
      style={{ width: "100%", height: "100%", imageRendering: "pixelated" }}
    />
  );
};