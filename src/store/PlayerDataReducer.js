import { CHANGE_CURRENT_STAGE, GET_CURRENT_STAGE, GROUPS_STAGE } from './actions/types'

const initialState = {

    currentGroup: 'a',
    currentPhase: GROUPS_STAGE
}

export default (state = initialState, action) => {
    switch (action.type) {
      case CHANGE_CURRENT_STAGE:
        return action.payload
      case GET_CURRENT_STAGE:
        return state
      default:
        return state
  }
}