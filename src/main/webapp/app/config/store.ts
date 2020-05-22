import { createStore, applyMiddleware, compose, AnyAction } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer, { IRootState } from 'app/redux/reducer';
import rootSaga from 'app/redux/saga';
import loggerMiddleware from './logger-middleware';
const sagaMiddleware = createSagaMiddleware();
const defaultMiddlewares = [sagaMiddleware, loggerMiddleware];
const composedMiddlewares = middlewares =>
  process.env.NODE_ENV === 'development'
    ? compose(applyMiddleware(...defaultMiddlewares, ...middlewares))
    : compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const initialize = (initialState?: IRootState, middlewares?: AnyAction) => {
  const store = createStore<IRootState, AnyAction, any, any>(reducer, initialState, composedMiddlewares(middlewares ? middlewares : []));
  sagaMiddleware.run(rootSaga);
  return store;
};

export default initialize;
