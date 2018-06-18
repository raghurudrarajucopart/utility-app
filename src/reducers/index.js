import { combineReducers } from 'redux';

import { login } from './login.reducer';
import { dashboard } from './dashboard.reducer';

const rootReducer = combineReducers({
  login,
  dashboard,
});

export default rootReducer;
