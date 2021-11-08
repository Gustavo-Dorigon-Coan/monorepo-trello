import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const configureStore = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default configureStore;