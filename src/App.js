import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Link} from 'react-router';
import {Navbar} from 'bloomer';
import { NavbarBrand } from 'bloomer/lib/components/Navbar/NavbarBrand';
import { NavbarItem } from 'bloomer/lib/components/Navbar/NavbarItem';
import { NavbarMenu } from 'bloomer/lib/components/Navbar/NavbarMenu';
import { NavbarEnd } from 'bloomer/lib/components/Navbar/NavbarEnd';
import { Columns } from 'bloomer/lib/grid/Columns';
import { Column } from 'bloomer/lib/grid/Column';
import { Button } from 'bloomer/lib/elements/Button';

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
              <Link to = {'/login'}><span className = "navbar-links">Login</span></Link>
            </NavbarItem>
            <NavbarItem className = "hidden-links">
              <Link to = {'/login'}><span className = "navbar-links">SignUp</span></Link>
            </NavbarItem>
          </NavbarBrand>
          <NavbarMenu>
            <NavbarEnd>
              <NavbarItem>
                <Link to = {'/login'}><span className = "navbar-links">Login</span></Link>
              </NavbarItem>
              <NavbarItem>
                <Link to = {'/login'}><span className = "navbar-links">SignUp</span></Link>
              </NavbarItem>
            </NavbarEnd>
          </NavbarMenu>
        </Navbar>
        <Columns>
          <Column isSize = {{desktop: 6, tablet: 8, mobile: 10}} isOffset = {{desktop: 3, tablet: 2, mobile:1}}>
            <span className = "landing-page-heading">A Trip Optimiser</span>
          </Column>
        </Columns>
        <Columns>
          <Column isSize = {{desktop: 8, tablet: 10, mobile: 10}} isOffset = {{desktop: 2, tablet: 1, mobile:1}}>
            <span className = "landing-page-content">Planning a trip has never been easier before.
              <br></br>
                  When to leave, how to leave, what all to take when you leave, we got you all covered.
            </span>
          </Column>
        </Columns>
        <Columns>
          <Column isSize = {{desktop: 4, tablet: 6, mobile: 8}} isOffset = {{desktop: 4, tablet: 3, mobile:2}}>
            <Link to = {'/login'}><Button className = "landing-page-btn">Login</Button></Link>
            <Link to = {'/login'}><Button className = "landing-page-btn">SignUp</Button></Link>
          </Column>
        </Columns>
      </div>
    );
  }
}

export default App;
