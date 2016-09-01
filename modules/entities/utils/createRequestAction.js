import _ from 'lodash';

import { createAction } from 'redux-actions';

const createRequestAction = (actionType, requestOptionsCreator, metaCreator) => {
  const actionCreator = createAction(actionType, (...args) => ({
    request: requestOptionsCreator(...args),
  }), metaCreator);

  _.assign(actionCreator, {
    type: actionType,
  });

  return actionCreator;
};

export default createRequestAction;

