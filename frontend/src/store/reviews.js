import { csrfFetch } from './csrf';

const ADD_REVIEW = 'reviews/ADD_REVIEW';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

const addReview = (review) => ({
  type: ADD_REVIEW,
  payload: review
});

const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  reviewId
});

export const postReview = (spotId, reviewData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(reviewData)
  });

  if (response.ok) {
    const review = await response.json();
    dispatch(addReview(review));
    return review;
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    dispatch(removeReview(reviewId));
  }
};


const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case REMOVE_REVIEW: {
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    }
    default:
      return state;
  }
};

export default reviewsReducer;
