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

// ------ STRATEGY ACTIONS ------ //
export const setStrategy = strategy => ({
  type: constants.SET_STRATEGY,
  payload: strategy,
});
export const clearStrategy = () => ({
  type: constants.CLEAR_STRATEGY,
});

// ------ WALLET ACTIONS ------ //
export const setWallet = wallet => ({
  type: constants.SET_WALLET,
  payload: wallet,
});
export const clearWallet = () => ({
  type: constants.CLEAR_WALLET,
});

// ------ FUNDING ACTIONS ------ //
export const setFunding = funding => ({
  type: constants.SET_FUNDING,
  payload: funding,
});
export const clearFunding = () => ({
  type: constants.CLEAR_FUNDING,
});
