import {
  CHANGE_CURRENT_GROUP,
  GET_CURRENT_GROUP
 
} from "./types"

export const changeGroup = group => {
  return {
    type: CHANGE_CURRENT_GROUP,
    payload: group
  }
}

export const getCurrentGroup = (group) => {
  return {
    type: CHANGE_CURRENT_GROUP,
    payload: group
  }
}

