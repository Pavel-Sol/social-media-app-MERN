import { createContext } from 'react';
import { useReducer } from 'react';

import { AuthReducer } from './AuthReducer';

const INITALSTATE = {
  user: null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITALSTATE);

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, INITALSTATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
