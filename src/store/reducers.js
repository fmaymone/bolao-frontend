import { combineReducers } from 'redux'
import initState from './init'
import { appReducers } from 'rmw-shell/lib/store/reducers'
import rootReducer from 'rmw-shell/lib/store/rootReducer'
import * as actionsTypes from './actions'
import worldcupreducer from './worldcupreducer'




const appReducer = combineReducers({
  ...appReducers, 
  worldCupData: worldcupreducer
  
  
})

export default (state, action) => rootReducer(appReducer, initState, state, action, worldcupreducer)
