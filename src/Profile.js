import React, { Component } from 'react';
import logo from './logo.svg';
import hamburgerLogo from './burgerIcon.svg';
import './App.css';
import { Navbar } from 'bloomer/lib/components/Navbar/Navbar';
import { NavbarBrand } from 'bloomer/lib/components/Navbar/NavbarBrand';
import { NavbarItem } from 'bloomer/lib/components/Navbar/NavbarItem';
import { scaleDown as Menu } from 'react-burger-menu';
import { Columns } from 'bloomer/lib/grid/Columns';
import { Column } from 'bloomer/lib/grid/Column';

class Profile extends Component {
    render() {
        return (
            <div id = "outer-container">
                <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } width = {'400px'} right>
                        <a className = "hm-list">View your saved trips</a>
                        <a className = "hm-list">Post a ride at Bla Bla Car</a>
                        <a className = "hm-list hm-logout">Logout</a>
                </Menu>
                <div id = "page-wrap">
                <Navbar className = "navbar">
                    <NavbarBrand>
                        <NavbarItem>
                            <img src={logo} className = "navbar-logo" /> <span className = "logo-name">Trip-a-Treat</span>
                        </NavbarItem>
                        <NavbarItem className = "hidden-links">
                            <span className = "navbar-links">Hello, </span>
                        </NavbarItem>
                        <NavbarItem className = "hidden-links">
                            <span className = "navbar-links">SignUp</span>
                        </NavbarItem>
                    </NavbarBrand>
                </Navbar>
                <Columns>
                    <Column isSize = {{desktop: 6, tablet: 8, mobile: 10}} isOffset = {{desktop: 3, tablet: 2, mobile: 1}}>
                        <p> Wekjbibsudcbsjdbccccccccccccccccccccccccccccccccccccccccccccccccccccccc</p>
                    </Column>
                </Columns>
                </div>
            </div>
        )
    }
}

export default Profile;