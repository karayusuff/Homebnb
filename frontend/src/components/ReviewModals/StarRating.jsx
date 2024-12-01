import { useState } from 'react';
import './StarRating.css';

const StarRating = ({ stars, setStars }) => {
  const [hovered, setHovered] = useState(0);

  const handleClick = (index) => {
    if (stars === index + 1) {
      setStars(0);
    } else {
      setStars(index + 1);
    }
  };

  const handleMouseEnter = (index) => {
    setHovered(index + 1);
  };

  const handleMouseLeave = () => {
    setHovered(0);
  };

  return (
    <div className="stars-input">
      {[...Array(5)].map((_, index) => {
        const isFilled = hovered >= index + 1 || stars >= index + 1;
        return (
          <span
            key={index}
            className={`star ${isFilled ? 'filled' : ''}`}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {isFilled ? '✭' : '✩'}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
