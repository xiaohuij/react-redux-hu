import { handleActions } from 'redux-actions';
import _ from 'lodash';
import * as actions from 'modules/entities/actions/index';
import { actionType } from 'modules/entities/utils/actionType';

export default handleActions({
  [actionType(actions.fetchKongfu)]: (kongfu, actions) => {
    return actions.payload.data._embedded.kongfu;
  },
}, {});
