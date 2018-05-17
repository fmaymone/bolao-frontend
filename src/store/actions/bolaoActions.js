import {
  CHANGE_CURRENT_STAGE,
  GET_CURRENT_STAGE,
  MATCH_UPDATE,
  MATCH_CREATE,
  MATCHES_FETCH_SUCCESS,
  MATCH_SAVE_SUCCESS,
  MATCHES_INITIAL_CREATE,
  ADD_USER_TO_POOL
} from "./types";

import { firebaseApp } from "../../firebase";
import firebase from "firebase";
import initialData from "../../world-cup";

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

// export const matchesInitialCreate = data => {
//   const { currentUser } = firebase.auth();

//   return dispatch => {
//     firebaseApp
//       .database()
//       .ref(`/users/${currentUser.uid}/matches`)
//       .set(data.matches)
//       .then(() => {
//         dispatch({ type: MATCHES_INITIAL_CREATE });
//       });
//   };
// };

export const updateMatch = (match, pool) => {
  const { currentUser } = firebase.auth();
  const id = match.name;

  return dispatch => {
    firebase
      .database()
      .ref(`/pools/${pool.key}/users/${currentUser.uid}/matches/${id}/`)
      .set(match)
      .then(() => {
        //console.log("writen match")
      });
  };
};
export const updateFinalResult = (match, pool) => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/pools/${pool.key}/users/${currentUser.uid}/matches/result/`)
      .set(match)
      .then(() => {
        //console.log("writen match")
      });
  };
};


export const updateClassification = (group, data, pool) => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    if (currentUser) {
      firebase
        .database()
        .ref(`/pools/${pool.key}/users/${currentUser.uid}/classification/${group}`)
        .set(data);
    }
  };
};

export const addUserToPool = (user, pool) => {
  return dispatch => {
    firebaseApp
      .database()
      .ref(`/pools/${pool}/users/${user}/matches/`)
      .set(initialData.matches)
      
  };
};

export const addUserPools = (user, pool) => {
  console.log(user);
  return dispatch => {
  firebaseApp
    .database()
    .ref(`/users/${user}/pools/${pool}`)
    .set(pool)
    
  }
};

export const removeUserPools = (user, pool) => {
  console.log(user);
  return dispatch => {
  firebaseApp
    .database()
    .ref(`/users/${user}/pools/`)
    .child(pool)
    .remove();
    
  }
};

export const removeUserOfPool = (user, pool) => {
  return dispatch => {
    firebaseApp
      .database()
      .ref(`/pools/${pool}/users/`)
      .child(user)
      .remove();
  };
};

export const fetchUserData = uid => {
  return dispatch => {
    firebaseApp
      .database()
      .ref(`/users/${uid}`)
      .on("value", snapshot => {
        return snapshot.val();
      });
  };
};
