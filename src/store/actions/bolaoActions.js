import {
  CHANGE_CURRENT_STAGE,
  GET_CURRENT_STAGE,
  MATCH_UPDATE,
  MATCH_CREATE,
  MATCHES_FETCH_SUCCESS,
  MATCH_SAVE_SUCCESS,
  MATCHES_INITIAL_CREATE
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

export const matchesInitialCreate = matches => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebaseApp
      .database()
      .ref(`/users/${currentUser.uid}/matches`)
      .set(matches)
      .then(() => {
        dispatch({ type: MATCHES_INITIAL_CREATE });
      });
  };
};

 export const updateMatch =  match => {
  try {
    const { currentUser } = firebase.auth();
    if (currentUser) {

      const ref = `/users/${currentUser.uid}/matches`;
      var list = [];
       firebase.database().ref(ref).on('value',  function (snap) { list = snap.val(); });

      if (list.length > 0) {
        const indexToUpdate = list.findIndex(k => k.name == match.name)
        if (indexToUpdate >= 0) {
          list[indexToUpdate] = match;

          return async dispatch => {

             firebase
              .database()
              .ref(`/users/${currentUser.uid}/matches`)
              .set(list)
              .then(() => {
                dispatch({ type: MATCH_UPDATE, payload: match });
              });

          };
        }
      }

    }
  }
  catch(e){
    console.log('Error on updateMatch()')
  }
};

// export const getMatchesFromGroup = (group) => {

//   const { currentUser } = firebase.auth();
//   let returnValues;
//   if(currentUser){
//     firebase.database().ref(`/users/${currentUser.uid}/matches`)
//       .on('value', snapshot => {
//         console.log(snapshot.val().groups);
//         returnValues = snapshot.val().groups.find(k => k.id===group);
//       });
//   }
//   console.log(returnValues);
//   return returnValues;

// }

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
