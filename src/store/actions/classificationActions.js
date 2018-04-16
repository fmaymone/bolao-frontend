import {
  CHANGE_CURRENT_STAGE,
  GET_CURRENT_STAGE,
  MATCH_UPDATE,
  MATCH_CREATE,
  MATCHES_FETCH_SUCCESS,
  MATCH_SAVE_SUCCESS,
  MATCHES_INITIAL_CREATE
} from "./types";

import firebase from "firebase";


const initialData = {
  a:{first:1, second:1},
  b:{first:1, second:1},
  c:{first:1, second:1},
  d:{first:1, second:1},
  e:{first:1, second:1},
  f:{first:1, second:1},
  g:{first:1, second:1},
  h:{first:1, second:1},
  49:{home:1, away:1},
  50:{home:1, away:1},
  51:{home:1, away:1},
  52:{home:1, away:1},
  53:{home:1, away:1},
  54:{home:1, away:1},
  55:{home:1, away:1},
  56:{home:1, away:1},
  57:{home:1, away:1},
  58:{home:1, away:1},
  59:{home:1, away:1},
  60:{home:1, away:1},
  61:{home:1, away:1},
  62:{home:1, away:1},
  63:{home:1, away:1},
  64:{home:1, away:1}


  


}

export const classificationInitialCreate = data => {
  const { currentUser } = firebase.auth();
  
 
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/classification`)
      .set(data.matches)
      .then(() => {
        dispatch({ type: MATCHES_INITIAL_CREATE });
      });
  };
};

