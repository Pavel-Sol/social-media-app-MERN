import { createContext } from 'react';
import { useReducer } from 'react';

import { AuthReducer } from './AuthReducer';

const INITALSTATE = {
  user: {
    email: 'test444@mail.ru',
    _id: '613b86980dd8c819080d912a',
    username: 'jhon',
    followers: [],
    followings: [],
  },
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
