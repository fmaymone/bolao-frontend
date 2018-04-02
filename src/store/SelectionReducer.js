import { CHANGE_CURRENT_GROUP, GET_CURRENT_GROUP } from './actions/types'

export default (state = 'a', action) => {
    switch (action.type) {
      case CHANGE_CURRENT_GROUP:
        return action.payload
      case GET_CURRENT_GROUP:
        return state
      default:
        return state
    }
  }