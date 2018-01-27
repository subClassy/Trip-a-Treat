import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Route, Router, hashHistory} from 'react-router';
import { firebaseApp } from './firebase';

import App from './App';
import Profile from './Profile';
import Login from './Login';
import Display from './Display';

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
            <Route path = "/display" component = {Display} />
    </Router>, document.getElementById('root')
);
registerServiceWorker();
