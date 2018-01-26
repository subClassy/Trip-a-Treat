import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Navbar} from 'bloomer';
import { NavbarBrand } from 'bloomer/lib/components/Navbar/NavbarBrand';
import { NavbarItem } from 'bloomer/lib/components/Navbar/NavbarItem';
import { NavbarMenu } from 'bloomer/lib/components/Navbar/NavbarMenu';
import { NavbarEnd } from 'bloomer/lib/components/Navbar/NavbarEnd';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar className = "navbar">
          <NavbarBrand>
            <NavbarItem>
              <img src={logo} className = "navbar-logo" /> <span className = "logo-name">Trip-a-Treat</span>
            </NavbarItem>
            <NavbarItem className = "hidden-links">
              <span className = "navbar-links">Login</span>
            </NavbarItem>
            <NavbarItem className = "hidden-links">
              <span className = "navbar-links">SignUp</span>
            </NavbarItem>
          </NavbarBrand>
          <NavbarMenu>
            <NavbarEnd>
              <NavbarItem>
                <span className = "navbar-links">Login</span>
              </NavbarItem>
              <NavbarItem>
                <span className = "navbar-links">SignUp</span>
              </NavbarItem>
            </NavbarEnd>
          </NavbarMenu>
        </Navbar>
      </div>
    );
  }
}

export default App;
