import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Columns } from 'bloomer/lib/grid/Columns';
import { Column } from 'bloomer/lib/grid/Column';
import { Box } from 'bloomer/lib/elements/Box';
import { Label } from 'bloomer/lib/elements/Form/Label';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            loginStyle: '1px solid #2EBD6B',
            signupStyle: '1px solid none'
        }
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
                        <img src={logo} className = "login-logo" />
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
                                        />
                                        <Label className = "label">Password</Label>
                                        <input
                                            className = "form-control password-input"
                                            type = "password"
                                        />
                                        <button
                                            className = "btn signin-btn"
                                            type = "button"
                                            // onClick = {() => this.signIn()}
                                        >
                                            SIGN IN
                                        </button>
                                        <hr /> 
                                        <p className = "alt-signin"> Sign In Using : </p>
                                        <div className = "oAuth-btns">
                                            <button
                                                className = "btn btn-google oAuth-btn"
                                                type = "button"
                                                onClick = {() => this.handleGoogleLogin()}
                                                style = {{marginLeft: '5px'}}
                                            >
                                                <i className="fa fa-google" aria-hidden="true" style = {{marginRight: '5px'}}></i>
                                                Google
                                            </button>
                                            <button
                                                className = "btn btn-facebook oAuth-btn"
                                                type = "button"
                                                onClick = {() => this.handleFacebookLogin()}
                                                style = {{marginLeft: '5px'}}
                                            >
                                                <i className="fa fa-facebook" aria-hidden="true" style = {{marginRight: '5px'}}></i>
                                                Facebook
                                            </button>
                                        </div>
                                    </div>
                                :
                                <div>hello</div>
                            }
                        </Box>
                    </Column>
                </Columns>
            </div>
        )
    }
}

export default Login;