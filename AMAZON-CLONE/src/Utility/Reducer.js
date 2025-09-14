import { Type } from "./actionType";

// Initialize basket from localStorage
const savedBasket = JSON.parse(localStorage.getItem("basket")) || [];

export const initialState = {
  basket: savedBasket,
  user: null,
};

export const Reducer = (state, action) => {
  let updatedBasket;

  switch (action.type) {
    case Type.ADD_TO_BASKET:
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );

      if (!existingItem) {
        updatedBasket = [...state.basket, { ...action.item, amount: 1 }];
      } else {
        updatedBasket = state.basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      localStorage.setItem("basket", JSON.stringify(updatedBasket)); // persist
      return {
        ...state,
        basket: updatedBasket,
      };

    case Type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex((item) => item.id === action.id);
      updatedBasket = [...state.basket];

      if (index >= 0) {
        if (updatedBasket[index].amount > 1) {
          updatedBasket[index] = {
            ...updatedBasket[index],
            amount: updatedBasket[index].amount - 1,
          };
        } else {
          updatedBasket.splice(index, 1);
        }
      }

      localStorage.setItem("basket", JSON.stringify(updatedBasket)); // persist
      return {
        ...state,
        basket: updatedBasket,
      };

    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case Type.CLEAR_BASKET:
      localStorage.removeItem("basket"); // clear storage after payment
      return {
        ...state,
        basket: [],
      };

    default:
      return state;
  }
};
