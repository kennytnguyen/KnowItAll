import { combineReducers } from 'redux'
import EntitiesReducer from './entities-reducer'
import EntityReducer from './entity-reducer'
import LoginReducer from './login-reducer'

const rootReducer = combineReducers({
  entities: EntitiesReducer,
  loginInfo: LoginReducer,
  entity: EntityReducer,
});

export default rootReducer;
