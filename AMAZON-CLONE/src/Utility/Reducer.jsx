// Reducer.jsx
import { Type } from "./actionType";

export const initialState = {
  basket: [],
};

export const Reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    default:
      return state;
  }
};
