import { combineReducers } from 'redux'
import initState from './init'
import { appReducers } from 'rmw-shell/lib/store/reducers'
import rootReducer from 'rmw-shell/lib/store/rootReducer'
import worldcupreducer from './worldcupreducer'
import playerDataReducer from './PlayerDataReducer'




const appReducer = combineReducers({
  ...appReducers, 
  worldCupData: worldcupreducer,
  playerDataReducer: playerDataReducer
  
  
})

export default (state, action) => rootReducer(appReducer, initState, state, action, worldcupreducer)
