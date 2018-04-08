import { CHANGE_CURRENT_STAGE, GET_CURRENT_STAGE, MATCHES_INITIAL_CREATE, MATCHES_FETCH_SUCCESS} from './actions/types'
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
      case MATCHES_INITIAL_CREATE:
        return initialState
      case MATCHES_FETCH_SUCCESS:
        console.log(action)
        return action.payload;
      default:
        return state
  }
}