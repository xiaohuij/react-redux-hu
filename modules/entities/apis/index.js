import { get, put, post } from 'modules/entities/utils/Request';

export const fetchKongfu = (kongfuId) => get('/kongfu?', { kongfuId });
