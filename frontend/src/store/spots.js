import { csrfFetch } from './csrf';

const SET_SPOTS = 'spots/SET_SPOTS';
const CREATE_SPOT = 'spots/CREATE_SPOT';
const UPDATE_SPOT = 'spots/UPDATE_SPOT';
const DELETE_SPOT = 'spots/DELETE_SPOT';

const setSpots = (spots) => ({
  type: SET_SPOTS,
  payload: spots
});

const createSpot = (spot) => ({
  type: CREATE_SPOT,
  payload: spot
});

const updateSpot = (spot) => ({
  type: UPDATE_SPOT,
  payload: spot
});

const deleteSpot = (spotId) => ({
  type: DELETE_SPOT,
  payload: spotId
});

export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  if (response.ok) {
    const data = await response.json();
    dispatch(setSpots(data.Spots));
    return data.Spots;
  }
};

export const createSpotThunk = (spotData) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spotData)
    });

    if (response.ok) {
      const newSpot = await response.json();
      dispatch(createSpot(newSpot));
      return newSpot;
    } else {
      const data = await response.json();
      return { errors: data.errors };
    }
  } catch {
    return { errors: 'An unexpected error occurred.' };
  }
};

export const updateSpotThunk = (spotId, spotData) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spotData)
    });

    if (response.ok) {
      const updatedSpot = await response.json();
      dispatch(updateSpot(updatedSpot));
      return updatedSpot;
    } else {
      const data = await response.json();
      return { errors: data.errors };
    }
  } catch {
    return { errors: 'An unexpected error occurred.' };
  }
};

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      dispatch(deleteSpot(spotId));
      return { success: true };
    } else {
      const data = await response.json();
      return { errors: data.errors };
    }
  } catch {
    return { errors: 'An unexpected error occurred.' };
  }
};

const initialState = { spots: [] };

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS:
      return { ...state, spots: action.payload };
    case CREATE_SPOT:
      return { ...state, spots: [...state.spots, action.payload] };
    case UPDATE_SPOT: {
      const updatedSpots = state.spots.map((spot) =>
        spot.id === action.payload.id ? action.payload : spot
      );
      return { ...state, spots: updatedSpots };
    }
    case DELETE_SPOT: {
      const remainingSpots = state.spots.filter((spot) => spot.id !== action.payload);
      return { ...state, spots: remainingSpots };
    }
    default:
      return state;
  }
};

export default spotsReducer;
