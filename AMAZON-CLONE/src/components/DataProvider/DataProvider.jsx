import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
import { Reducer, initialState } from "../../Utility/Reducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Utility/firebase";
import { Type } from "../../Utility/actionType";

// Create context
// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext();

// Provider
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });

    return unsubscribe;
  }, []);

  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  );
};

// Hook
// eslint-disable-next-line react-refresh/only-export-components
export const useStateValue = () => useContext(DataContext);
