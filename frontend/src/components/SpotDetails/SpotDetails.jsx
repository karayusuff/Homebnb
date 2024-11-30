import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SpotDetails.css';

const SpotDetails = () => {
  const { spotId } = useParams();
  const [spot, setSpot] = useState('');

  useEffect(() => {
    fetch(`/api/spots/${spotId}`)
      .then((response) => response.json())
      .then((data) => setSpot(data));
  }, [spotId]);

  if (!spot) return <div>Loading...</div>;

  return (
    <div className="spot-details">
      <h1>{spot.name}</h1>
      <p>{spot.city}, {spot.state}, {spot.country}</p>
      <div className="spot-images">
        <img src={spot.previewImage} alt={`${spot.name} preview`} className="large-image" />
        <div className="small-images">
          {spot.SpotImages.map((image, index) => (
            <img key={index} src={image} alt={`${image.url}`} />
          ))}
        </div>
      </div>
      <div className="details-container">
        <div className="spot-info">
          <p>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}.</p>
          <p>{spot.description}</p>
        </div>
        <div className="callout-box">
          <p><span className='bold-price'>${spot.price}</span> / night</p>
          <button id='reserve-button' onClick={() => alert('Feature coming soon')}>Reserve</button>
        </div>
      </div>
    </div>
  );

};

export default SpotDetails;
