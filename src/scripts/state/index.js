import {combineReducers,createStore} from 'redux'
import * as reducers from './reducers.js'

const initialState = {
}

const store = createStore(combineReducers({...reducers}))

const dispatch = store.dispatch

export default store

export {dispatch}
