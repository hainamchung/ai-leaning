import { combineReducers } from 'redux';

import loadingReducer, { LoadingState } from './loading.reducer';

export interface IRootState {
  readonly loadingReducer: LoadingState;
}

const rootReducer = combineReducers<IRootState>({
  loadingReducer
});

export default rootReducer;
