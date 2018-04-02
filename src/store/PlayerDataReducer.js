import { CHANGE_CURRENT_GROUP, GET_CURRENT_GROUP } from './actions/types'

const initialState = {

    currentGroup: 'a',
    classification: {
      id: 'a',
      teams: 
        {
          id:'1', 
          handycap:{wins:0,loses:0,draws:0,goals_for:0,goals_against:0}
        }
    }
}

export default (state = {currentGroup: 'a', classification:{}}, action) => {
    switch (action.type) {
      case CHANGE_CURRENT_GROUP:
        return action.payload
      case GET_CURRENT_GROUP:
        return state
      default:
        return state
  }
}