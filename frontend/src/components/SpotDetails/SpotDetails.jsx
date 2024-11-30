import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SpotDetails.css';

const SpotDetails = () => {
  const { spotId } = useParams();
  const [spot, setSpot] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`/api/spots/${spotId}`)
      .then((response) => response.json())
      .then((data) => setSpot(data));

    fetch(`/api/spots/${spotId}/reviews`)
      .then((response) => response.json())
      .then((data) => setReviews(data.Reviews || []));
  }, [spotId]);

  if (!spot) return <div>Loading...</div>;

  const reviewCount = reviews.length;
  const averageRating = reviewCount > 0 ? (
    reviews.reduce((sum, review) => sum + review.stars, 0) / reviewCount
  ) : null;

  const ratingDisplay = averageRating ? averageRating.toFixed(2) : "New";

  const previewImage = spot.SpotImages?.find((image) => image.preview === true);
  const otherImages = spot.SpotImages?.filter((image) => image.preview !== true);

  const renderStars = (stars) => {
    let fullStars = Math.floor(stars);
    let emptyStars = 5 - fullStars;
    let starString = '✭'.repeat(fullStars) + '✩'.repeat(emptyStars);
    return starString;
  };

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
                <span className="star">★</span> {ratingDisplay}
              </span>
              <span className="separator">·</span>
              <span>{reviewCount} {reviewCount > 1 ? 'Reviews' : 'Review'}</span>
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

      <div className="reviews-section">
        <div className="reviews-summary">
          <div className="rating-details">
            <span className="star-rating">
              <span className="star">★</span> {ratingDisplay}
            </span>
            <span className="separator">·</span>
            <span>{reviewCount} {reviewCount > 1 ? 'Reviews' : 'Review'}</span>
          </div>
        </div>

        {reviewCount === 0 ? (
          <p>Be the first to post a review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review">
              <span className="review-owner">{review.User.firstName} {review.User.lastName}</span> 
              <span className="separator">·</span>
              <span className="review-date">({new Date(review.createdAt).toLocaleDateString()})</span>
              <div className="review-rating">
                <span>{renderStars(review.stars)}</span>
                <span className="separator">·</span>
                <span className="stars-text">{review.stars} Stars</span>
              </div>
              <p>{review.review}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SpotDetails;
