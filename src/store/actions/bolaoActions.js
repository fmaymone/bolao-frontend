import {
  CHANGE_CURRENT_GROUP,
  GET_CURRENT_GROUP,
  COMPUTE_CLASSIFICATION
 
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

export const computeClassification = (data) => {
  return {
    type: COMPUTE_CLASSIFICATION,
    payload: data
  }

}

