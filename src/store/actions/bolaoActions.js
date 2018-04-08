import {
  CHANGE_CURRENT_STAGE,
  GET_CURRENT_STAGE,
  MATCH_UPDATE,
  MATCH_CREATE,
  MATCHES_FETCH_SUCCESS,
  MATCH_SAVE_SUCCESS,
  MATCHES_INITIAL_CREATE
} from "./types"

import {firebaseApp} from '../../firebase';


export const changeStage = group => {
  return {
    type: CHANGE_CURRENT_STAGE,
    payload: group
  }
}

export const getCurrentStage = () => {
  return {
    type: GET_CURRENT_STAGE,
    
  }
}
export const matchUpdate = ({ prop, value }) => {
  return {
    type: MATCH_UPDATE,
    payload: { prop, value }
  };
};

export const matchesInitialCreate = (user, match) => {
  const { currentUser } = firebaseApp.auth();

  return (dispatch) => {
    firebaseApp.database().ref(`/users/${user}/matches`)
      .push(match)
      .then(() => {
        dispatch({ type: MATCHES_INITIAL_CREATE });
        
      });
  };
};
const mapStateToProps = state => {
  const { auth } = state;

  return auth
};

export const matchesFetch = (user) => {
  
  
  return (dispatch) => {
    firebaseApp.database().ref(`/users/${user}/matches`)
      .on('value', snapshot => {
        dispatch({ type: MATCHES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};





