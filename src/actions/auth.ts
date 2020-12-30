import { myFirebase } from "../firebase/firebase";
import {User} from "firebase";
import {ThunkDispatch} from "redux-thunk";

export const LOGIN_REQUEST: string = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
export const LOGIN_FAILURE: string = "LOGIN_FAILURE";

export const LOGOUT_REQUEST: string = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: string = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE: string = "LOGOUT_FAILURE";

export const VERIFY_REQUEST: string = "VERIFY_REQUEST";
export const VERIFY_SUCCESS: string = "VERIFY_SUCCESS";

const requestLogin = () => {
  return {
    type: LOGIN_REQUEST
  };
};

const receiveLogin = (user: User | null) => {
  return {
    type: LOGIN_SUCCESS,
    user
  };
};

const loginError = () => {
  return {
    type: LOGIN_FAILURE
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE
  };
};

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS
  };
};

export const loginUser = (email: string, password: string) => (dispatch: ThunkDispatch<User, any, any>) => {
  dispatch(requestLogin());
  myFirebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(receiveLogin(user.user));
    })
    .catch(error => {
      dispatch(loginError());
    });
};

export const logoutUser = () => (dispatch: ThunkDispatch<User, any, any>) => {
  dispatch(requestLogout());
  myFirebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
    })
    .catch(error => {
      dispatch(logoutError());
    });
};

export const verifyAuth = () => (dispatch: ThunkDispatch<User, any, any>) => {
  dispatch(verifyRequest());
  myFirebase.auth().onAuthStateChanged(user => {
    if (user !== null) {
      dispatch(receiveLogin(user));
    }
    dispatch(verifySuccess());
  });
};
