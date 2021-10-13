import { createContext } from 'react';
import { useReducer } from 'react';

import { AuthReducer } from './AuthReducer';

const INITALSTATE = {
  user: {
    profilePicture: '',
    coverPicture: '',
    followers: ['613b86980dd8c819080d912a'],
    followings: [],
    isAdmin: false,
    _id: '613dfd29ef6e6b1b4c2abdb0',
    username: 'maria',
    email: 'test111@mail.ru',
    password: '$2b$10$VFBtf.GHWfRmKQRDWpjkleRVSgv1WUIfdysq5W39h3izAPsl0/u8G',
    createdAt: '2021-09-12T13:14:17.207Z',
    updatedAt: '2021-10-09T09:30:44.439Z',
    __v: 0,
    desc: 'ку ку ёпта',
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
