import { Type } from "./actionType";
import { auth } from "./firebase";  // make sure this points to your firebase.js

const savedBasket = JSON.parse(localStorage.getItem("basket")) || [];

// Get the current Firebase user if already logged in
const currentUser = auth.currentUser || null;

// eslint-disable-next-line react-refresh/only-export-components
export const initialState = {
  basket: savedBasket,
  user: currentUser,  
};

export const Reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET: {
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );

      let updatedBasket;

      if (!existingItem) {
        updatedBasket = [...state.basket, { ...action.item, amount: 1 }];
      } else {
        updatedBasket = state.basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      localStorage.setItem("basket", JSON.stringify(updatedBasket));

      return {
        ...state,
        basket: updatedBasket,
      };
    }

    case Type.REMOVE_FROM_BASKET: {
      const index = state.basket.findIndex((item) => item.id === action.id);
      let updatedBasket = [...state.basket];

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

      localStorage.setItem("basket", JSON.stringify(updatedBasket));

      return {
        ...state,
        basket: updatedBasket,
      };
    }

    case Type.CLEAR_BASKET: {
      localStorage.removeItem("basket");
      return {
        ...state,
        basket: [],
      };
    }

    case Type.SET_USER: {
      return {
        ...state,
        user: action.user,
      };
    }

    default:
      return state;
  }
};
