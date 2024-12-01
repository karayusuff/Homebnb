import { csrfFetch } from './csrf';

const ADD_REVIEW = 'reviews/ADD_REVIEW';

const addReview = (review) => ({
  type: ADD_REVIEW,
  payload: review
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

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    default:
      return state;
  }
};

export default reviewsReducer;
