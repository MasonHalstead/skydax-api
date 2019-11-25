import * as constants from 'ducks/types';

// ------ USER ACTIONS ------ //
export const loginUser = user => ({
  type: constants.LOGIN_USER,
  payload: user,
});
export const updateUser = user => ({
  type: constants.UPDATE_USER,
  payload: user,
});
export const logoutUser = () => ({
  type: constants.LOGOUT_USER,
});

// ------ SETTINGS ACTIONS ------ //
export const setErrorMessage = message => ({
  type: constants.SET_ERROR_MESSAGE,
  payload: message,
});
export const setLoading = loading => ({
  type: constants.SET_LOADING,
  payload: loading,
});

// ------ STRATEGIES ACTIONS ------ //
export const setStrategies = strategies => ({
  type: constants.SET_STRATEGIES,
  payload: strategies,
});
export const clearStrategies = () => ({
  type: constants.CLEAR_STRATEGIES,
});