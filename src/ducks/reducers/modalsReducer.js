import { SET_MODAL } from 'ducks/types';

const modalsState = {
  skydax_error: false,
};
export const modalsReducer = (state = modalsState, action) => {
  switch (action.type) {
    case SET_MODAL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
