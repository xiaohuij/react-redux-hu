import qs from 'qs';

const request = (method, url, data) => ({
  url,
  method,
  headers: {
    'Content-Type': 'application/json',
  },
  data,
});

export const get = (url, query) => request('GET', query ? `${url}${qs.stringify(query)}` : url);
export const post = (url, data) => request('POST', url, data);
export const patch = (url, data) => request('PATCH', url, data);
export const del = (url, data) => request('DELETE', url, data);
export const put = (url, data) => request('PUT', url, data);
