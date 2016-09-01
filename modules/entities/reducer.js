import { combineReducers } from 'redux';
import kongfu from 'modules/entities/reducers/kongfu';

export const reducers = {
  kongfu,
};

export default {
  entities: combineReducers(reducers),
};
