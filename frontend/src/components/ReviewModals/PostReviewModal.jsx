import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { postReview } from '../../store/reviews';
import StarRating from './StarRating';
import './PostReviewModal.css';

const PostReviewModal = ({ spotId }) => {
  const [reviewText, setReviewText] = useState('');
  const [stars, setStars] = useState(0);
  const [error, setError] = useState('');
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const isValid = () => (reviewText.length >= 10 && stars > 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = { review: reviewText, stars };

    try {
      dispatch(postReview(spotId, reviewData));
      closeModal();
      window.location.reload();
    } catch (err) {
        const data = await err.json();
        if (data.message) {
          setError(data.message);
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
    }
  };

  return (
    <div className="post-review-modal">
      <h2>How was your stay?</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Leave your review here..."
        />
        <StarRating stars={stars} setStars={setStars} />
        <button 
          id="review-button" 
          type="submit"
          disabled={!isValid()}
        >
          Submit Your Review
        </button>
      </form>
    </div>
  );
};

export default PostReviewModal;
