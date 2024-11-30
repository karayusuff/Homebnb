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

  const previewImage = spot.SpotImages?.find((image) => image.preview === true);
  const otherImages = spot.SpotImages?.filter((image) => image.preview !== true);

  return (
    <div className="spot-details">
      <h1>{spot.name}</h1>
      <p>
        {spot.city}, {spot.state}, {spot.country}
      </p>
      <div className="spot-images">
        {previewImage ? (
          <img
            src={previewImage.url}
            alt={`${spot.name} - image 1 (preview)`}
            className="large-image"
          />
        ) : (
          <p>Preview image not available</p>
        )}
        <div className="small-images">
          {otherImages?.map((image, index) => (
            <img key={index} src={image.url} alt={`${spot.name} - image ${index + 2}`} />
          ))}
        </div>
      </div>
      <div className="details-container">
        <div className="spot-info">
          <p>
            Hosted by <span className="bold-name">{spot.Owner.firstName} {spot.Owner.lastName}.</span>
          </p>
          <p>{spot.description}</p>
        </div>
        <div className="callout-box">
          <div className="rating-price-container">
            <div className="rating-details">
              <span className="star-rating">
                <span className="star">★</span> {spot.avgStarRating ? spot.avgStarRating : 'New'}
              </span>
              <span className="separator">·</span>
              <span>{spot.numReviews} {spot.numReviews > 1 ? 'Reviews' : 'Review'}</span>
            </div>
              <div className="price-details">
                <span className="bold-price">${spot.price}</span>
                <span className="regular-text"> / night</span>
              </div>
            </div>
            <button
              id="reserve-button"
              onClick={() => alert('Feature coming soon')}
            >
              Reserve
            </button>
        </div>
      </div>
    </div>
  );
};

export default SpotDetails;
