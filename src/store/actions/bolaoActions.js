import {
  CHANGE_CURRENT_STAGE,
  GET_CURRENT_STAGE
} from "./types"

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


