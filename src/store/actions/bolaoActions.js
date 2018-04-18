import {
  CHANGE_CURRENT_STAGE,
  GET_CURRENT_STAGE,
  MATCH_UPDATE,
  MATCH_CREATE,
  MATCHES_FETCH_SUCCESS,
  MATCH_SAVE_SUCCESS,
  MATCHES_INITIAL_CREATE,
  
} from "./types";

import { firebaseApp } from "../../firebase";
import firebase from "firebase";

export const changeStage = group => {
  return {
    type: CHANGE_CURRENT_STAGE,
    payload: group
  };
};

export const getCurrentStage = () => {
  return {
    type: GET_CURRENT_STAGE
  };
};
export const matchUpdate = ({ prop, value }) => {
  return {
    type: MATCH_UPDATE,
    payload: { prop, value }
  };
};

export const matchesInitialCreate = data => {
  const { currentUser } = firebase.auth();
  
 
  return dispatch => {
    firebaseApp
      .database()
      .ref(`/users/${currentUser.uid}/matches`)
      .set(data.matches)
      .then(() => {
        dispatch({ type: MATCHES_INITIAL_CREATE });
      });
  };
};

export const updateMatch = match => {
  const { currentUser } = firebase.auth();
  const id = match.name;
 
  return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/matches/${id}/`)
        .set(match)
        .then(() => {
          //console.log("writen match")
        });
    };
 }
 export const updateFinalResult = match => {
  const { currentUser } = firebase.auth();
   
  return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/matches/result/`)
        .set(match)
        .then(() => {
          //console.log("writen match")
        });
    };
 }

export const matchesFetch = () => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    if (currentUser) {
      firebase
        .database()
        .ref(`/users/${currentUser.uid}/matches`)
        .on("value", snapshot => {
          dispatch({
            type: MATCHES_FETCH_SUCCESS,
            payload: { matches: snapshot.val() }
          });
          // console.log(snapshot.val().groups);
        });
    }
  };
};

export const updateClassification = (group, data) =>{
  const { currentUser } = firebase.auth();
  
  return dispatch => {
    if (currentUser) {
      firebase
        .database()
        .ref(`/users/${currentUser.uid}/classification/${group}`)
        .set(data);
    }
  };
}