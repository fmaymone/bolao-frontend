import { CHANGE_CURRENT_STAGE, GET_CURRENT_STAGE, MATCHES_INITIAL_CREATE, MATCHES_FETCH_SUCCESS, GROUPS_STAGE} from './actions/types'
import data from '../world-cup';

const initialState = {

    currentGroup: 'a',
    currentPhase: GROUPS_STAGE,
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
      case MATCHES_INITIAL_CREATE:
        return initialState
      case MATCHES_FETCH_SUCCESS:
         return {...state, matches: action.payload };
      default:
        return state
  }
}