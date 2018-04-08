import { CHANGE_CURRENT_STAGE, GET_CURRENT_STAGE, MATCH_CREATE, } from './actions/types'
import data from '../world-cup';

const initialState = {

    currentGroup: 'a',
    currentPhase: 'groups',
    matches: {
      groups:data.groups,
      knockout:data.knockout
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
      case CHANGE_CURRENT_STAGE:
        return action.payload
      case GET_CURRENT_STAGE:
        return state
      case MATCH_CREATE:
        return initialState
      default:
        return state
  }
}