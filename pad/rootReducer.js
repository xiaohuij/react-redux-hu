import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import reducerForEntities from 'modules/entities/reducer';

export default combineReducers({
  routing: routerReducer,
  ...reducerForEntities,
});
