import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Route, Router, hashHistory} from 'react-router';
import { firebaseApp } from './firebase';

import App from './App';
import Profile from './Profile';
import Login from './Login';

firebaseApp.auth().onAuthStateChanged(user => {
    if(user) {
        hashHistory.push('/profile');
    }
    else {
        hashHistory.replace('/app');
    }
})

ReactDOM.render(
    <Router path = "/" history = {hashHistory}>
            <Route path = "/app" component = {App} />
            <Route path = "/profile" component = {Profile} />
            <Route path = "/login" component = {Login} />
    </Router>, document.getElementById('root')
);
registerServiceWorker();
