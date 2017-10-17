import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'

import App from './components/app';
import reducers from './reducers';
import { BrowserRouter } from 'react-router-dom'

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, 
		 		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const ProviderApp = () => {
	return (
		 <Provider store={store}>
    		<App />
  		</Provider>
	)
}

ReactDOM.render(
	<BrowserRouter>
 		<ProviderApp />
 	</BrowserRouter>
  , document.querySelector('#app'));
