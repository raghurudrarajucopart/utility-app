import { combineReducers } from 'redux';

import { login } from './login.reducer';
import { dashboard } from './dashboard.reducer';
import { uielements } from './uielements.reducer';

const rootReducer = combineReducers({
  login,
  dashboard,
  uielements,
});

export default rootReducer;
