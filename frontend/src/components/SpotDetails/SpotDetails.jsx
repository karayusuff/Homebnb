import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import PostReviewModal from '../ReviewModals/PostReviewModal';
import ConfirmDeleteModal from '../ReviewModals/ConfirmDeleteModal';
import { deleteReview } from '../../store/reviews';
import './SpotDetails.css';

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const [spot, setSpot] = useState('');
  const [reviews, setReviews] = useState([]);
  const currentUser = useSelector((state) => state.session.user);

  const isOwner = currentUser && currentUser.id === spot.ownerId;

  useEffect(() => {
    fetch(`/api/spots/${spotId}`)
      .then((response) => response.json())
      .then((data) => setSpot(data));

    fetch(`/api/spots/${spotId}/reviews`)
      .then((response) => response.json())
      .then((data) => {
        const sortedReviews = (data.Reviews || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReviews(sortedReviews);
      });
  }, [spotId]);

  const handleDeleteReview = async (reviewId) => {
    dispatch(deleteReview(reviewId));
    setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
  };

  if (!spot) return <div>Loading...</div>;

  const reviewCount = reviews.length;
  const averageRating = reviewCount > 0 ? (
    reviews.reduce((sum, review) => sum + review.stars, 0) / reviewCount
  ) : null;

  const ratingDisplay = averageRating ? averageRating.toFixed(2) : "New";

  const previewImage = spot.SpotImages?.find((image) => image.preview === true);
  const otherImages = spot.SpotImages?.filter((image) => image.preview !== true);

  const renderStars = (stars) => {
    let fullStars = stars;
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
                {reviewCount > 0 && (
                  <>
                    <span className="separator">·</span>
                    <span>{reviewCount} {reviewCount > 1 ? 'Reviews' : 'Review'}</span>
                  </>
                )}
              </span>
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
            <span>{reviewCount > 0 ? `${reviewCount} ${reviewCount > 1 ? 'Reviews' : 'Review'}` 
              : "No review yet"}
            </span>
            <span className="separator">·</span>
              <span className="star">★</span> {ratingDisplay}
            </span>
          </div>
        </div>
        {currentUser && !isOwner && !reviews.some((review) => review.userId === currentUser.id) && (
          <OpenModalButton
            buttonText="Post Your Review"
            modalComponent={<PostReviewModal spotId={spotId} />}
          />
        )}
        {reviewCount === 0 && currentUser && !isOwner ? (
          <p>Be the first to post a review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review">
              <span className="review-owner">{review.User.firstName} {review.User.lastName}</span> 
              <span className="separator">·</span>
              <span className="review-date">
                {new Date(review.createdAt).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <div className="review-rating">
                <span className="review-stars">{renderStars(review.stars)}</span>
                <span className="separator">·</span>
                <span className="stars-text">{review.stars} Stars</span>
              </div>
              <p className="review-text">{review.review}</p>
              {currentUser && currentUser.id === review.userId && (
                <OpenModalButton
                  buttonText="Delete"
                  modalComponent={
                    <ConfirmDeleteModal
                      reviewId={review.id}
                      onDelete={handleDeleteReview}
                    />
                  }
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SpotDetails;
