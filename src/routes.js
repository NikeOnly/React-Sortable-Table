import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import App from './App';

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Route exact={true} path='/' component={App}/>
                {/* <Route path='/main' component={Main}/> */}
                {/* <Route path='/footer' component={Footer}/> */}
                {/* <Route path="/search/footer" component={Footer}/> */}
                {/* <Route path="/:parameter" component={Main}/> */}
            </div>
        );
    }
}
