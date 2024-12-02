import { csrfFetch } from './csrf';

const SET_SPOTS = 'spots/SET_SPOTS';
const CREATE_SPOT = 'spots/CREATE_SPOT';

const setSpots = (spots) => {
  return {
    type: SET_SPOTS,
    payload: spots
  };
};

const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    payload: spot
  };
};

export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  const data = await response.json();
  dispatch(setSpots(data.Spots));
  return data.Spots;
};

export const createSpotThunk = (spotData) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spotData),
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
    return { errors: { general: 'An unexpected error occurred.' } };
  }
};

const initialState = { spots: [] };

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS:
      return { ...state, spots: action.payload };
    case CREATE_SPOT:
      return { ...state, spots: [...state.spots, action.payload] };
    default:
      return state;
  }
};

export default spotsReducer;
    