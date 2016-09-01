import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware, routerActions, push } from 'react-router-redux';
import config from 'config';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import cookies from 'js-cookie';
import { hashHistory } from 'react-router';

const client = axios.create({
  baseURL: `${config.API_BASE_URL}/api`,
  responseType: 'json',
  headers: {
    'x-csrf-token': cookies.get('x-csrf-token'),
  },
});

const axiosMiddlewareOption = {
  interceptors: {
    response: [{
      success: (getState, response) => {
        return response;
      },
      error: ({}, error) => {
        if (error.response.status === 401) {
        }
      },
    }],
  },
};

const configStore = ({ history, rootReducer, initialState }) => {
  const middlewares = [
    axiosMiddleware(client, axiosMiddlewareOption),
  ];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(require('redux-logger')());
  }
  const finalMiddlewares = [
    ...middlewares,
    routerMiddleware(history),
  ];

  return applyMiddleware(
    ...finalMiddlewares
  )(createStore)(rootReducer, initialState);
};

export default configStore;
