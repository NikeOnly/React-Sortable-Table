import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter as Router} from 'react-router-dom';
import promise from 'redux-promise';

import Routes from './routes';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(
    promise
)(createStore);

const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Routes/>
        </Router>
    </Provider>, document.querySelector('.container'));
