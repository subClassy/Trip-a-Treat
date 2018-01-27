import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Link} from 'react-router';
import './bootstrap-social.css';
import { firebaseApp, auth, providerGoogle, providerFacebook } from './firebase';
import * as firebase from 'firebase';
import { Columns } from 'bloomer/lib/grid/Columns';
import { Column } from 'bloomer/lib/grid/Column';
import { Box } from 'bloomer/lib/elements/Box';
import { Label } from 'bloomer/lib/elements/Form/Label';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            loginStyle: '1px solid #2EBD6B',
            signupStyle: '1px solid none',
            emailSignUp: '',
            passwordSignUp: '',
            nameSignup: '',
            passwordSignIn: '',
            emailSignIn: ''
        }
    }

    handleGoogleLogin() {
        auth.signInWithPopup(providerGoogle) 
            .then((result) => {
                const user = result.user;
                const  email = user.email;
                axios.post("https://a62c40c4.ngrok.io/login", {
                    "viaOauth": true,
                    "email": email
                }).then(response => {
                    localStorage.setItem('userId', response.userId)
                })
                this.setState({
                    user
            });
            firebase.database().ref('users/' + user.uid).set({
            username: user.displayName,   
        });
    })
        .catch(error => {
            console.log(error);
            alert(error.message);
        })
    }

    handleFacebookLogin() {
        auth.signInWithPopup(providerFacebook) 
            .then((result) => {
                const user = result.user;
                const email = user.email;
                axios.post("https://a62c40c4.ngrok.io/login", {
                    "viaOauth": true,
                    "email": email
                }).then(response => {
                    localStorage.setItem('userId', response.userId)
                })
                this.setState({
                    user
            });
            firebase.database().ref('users/' + user.uid).set({
            username: user.displayName,   
        });
    })
    .catch(error => {
        console.log(error);
        alert(error.message);
        })
    }

    signUp() {
        const {emailSignUp, passwordSignUp,nameSignup} = this.state;
        console.log("helo");
        firebaseApp.auth().createUserWithEmailAndPassword(emailSignUp, passwordSignUp)
            .then(() => {
                var user = firebaseApp.auth().currentUser;
                 firebase.database().ref('users/' + user.uid).set({
                    username: nameSignup,
                 });
            })
            .catch(error => {
                console.log(error);
                alert(error.message);
            }) 
    }

    signIn() {
        const {emailSignIn, passwordSignIn} = this.state;
            firebaseApp.auth().signInWithEmailAndPassword(emailSignIn, passwordSignIn)
                .catch(error => {
                    console.log(error);
                    alert(error.message);
                    this.setState({error});
        }) 
    }

    handleLoginClick() {
        this.setState({
            isLogin: true,
            loginStyle: '1px solid #2EBD6B',
            signupStyle: ''
        });
    }

    handleSignupCLick() {
        this.setState({
            isLogin: false,
            loginStyle: '',
            signupStyle: '1px solid #2EBD6B'
        });
    }

    render() {
        return (
            <div>
                <Columns>
                    <Column isSize = {{desktop: 4, tablet: 4, mobile: 6}} isOffset = {{desktop: 4, tablet: 4, mobile:3}}>
                        <Link to = {'/app'} ><img src={logo} className = "login-logo" /></Link>
                    </Column>
                </Columns>
                <Columns>
                    <Column isSize = {{desktop: 6, tablet: 8, mobile: 10}} isOffset = {{desktop: 3, tablet: 2, mobile:1}}>
                        <Box className = "login-box">
                            <Columns>
                                <Column>
                                    <div className = "tabs tabs-login" onClick = {() => this.handleLoginClick()} style = {{borderBottom: this.state.loginStyle}}>Login</div>
                                </Column>
                                <Column>
                                    <div className = "tabs tabs-signup" onClick = {() => this.handleSignupCLick()} style={{borderBottom: this.state.signupStyle}}>SignUp</div>
                                </Column>
                            </Columns>
                            {
                                (this.state.isLogin === true) ?
                                    <div className = "form-group">
                                        <Label className = "label">Email</Label>
                                        <input
                                            className = "form-control email-input"
                                            type = "text"
                                            onChange = {
                                                event => this.setState({
                                                            emailSignIn: event.target.value
                                                }) 
                                            }
                                        />
                                        <Label className = "label">Password</Label>
                                        <input
                                            className = "form-control password-input"
                                            type = "password"
                                            onChange = {
                                                event => this.setState({
                                                            passwordSignIn: event.target.value
                                                }) 
                                            }
                                        />
                                        <button
                                            className = "btn signin-btn"
                                            type = "button"
                                            onClick = {() => this.signIn()}
                                        >
                                            Login
                                        </button>
                                        <hr /> 
                                        <p className = "alt-signin"> Sign In Using : </p>
                                        <div className = "oAuth-btns">
                                            <button
                                                className = "btn btn-google oAuth-btn"
                                                type = "button"
                                                onClick = {() => this.handleGoogleLogin()}
                                            >
                                                <i className="fa fa-google" aria-hidden="true"></i>
                                                Google
                                            </button>
                                            <button
                                                className = "btn btn-facebook oAuth-btn"
                                                type = "button"
                                                onClick = {() => this.handleFacebookLogin()}
                                            >
                                                <i className="fa fa-facebook" aria-hidden="true"></i>
                                                Facebook
                                            </button>
                                        </div>
                                    </div>
                                :
                                <div className = "form-group">
                                        <Label className = "label">Email</Label>
                                        <input
                                            className = "form-control email-input"
                                            type = "text"
                                            onChange = {
                                                event => this.setState({
                                                            emailSignUp: event.target.value
                                                }) 
                                            }
                                        />
                                        <Label className = "label">Username</Label>
                                        <input
                                            className = "form-control email-input"
                                            type = "text"
                                            onChange = {
                                                event => 
                                                    this.setState({
                                                        nameSignup: event.target.value
                                                }) 
                                            }
                                        />
                                        <Label className = "label">Password</Label>
                                        <input
                                            className = "form-control password-input"
                                            type = "password"
                                            onChange = {
                                                event => 
                                                    this.setState({
                                                        passwordSignUp: event.target.value
                                                }) 
                                            }
                                        />
                                        <button
                                            className = "btn signin-btn"
                                            type = "button"
                                            onClick = {() => this.signUp()}
                                        >
                                            SignUp
                                        </button>
                                        <hr /> 
                                        <p className = "alt-signin"> Sign Up Using : </p>
                                        <div className = "oAuth-btns">
                                            <button
                                                className = "btn btn-google oAuth-btn"
                                                type = "button"
                                                onClick = {() => this.handleGoogleLogin()}
                                            >
                                                <i className="fa fa-google" aria-hidden="true"></i>
                                                Google
                                            </button>
                                            <button
                                                className = "btn btn-facebook oAuth-btn"
                                                type = "button"
                                                onClick = {() => this.handleFacebookLogin()}
                                            >
                                                <i className="fa fa-facebook" aria-hidden="true"></i>
                                                Facebook
                                            </button>
                                        </div>
                                    </div>
                            }
                        </Box>
                    </Column>
                </Columns>
            </div>
        )
    }
}

export default Login;