import * as apis from 'modules/entities/apis/index';
import createRequestAction from 'modules/entities/utils/createRequestAction';

export const fetchKongfu = createRequestAction(
  'fetchKongfu',
  apis.fetchKongfu
);
