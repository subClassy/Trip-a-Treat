import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar } from 'bloomer/lib/components/Navbar/Navbar';
import { NavbarBrand } from 'bloomer/lib/components/Navbar/NavbarBrand';
import { NavbarItem } from 'bloomer/lib/components/Navbar/NavbarItem';

class Profile extends Component {
    render() {
        return (
            <div>
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
            </div>
        )
    }
}

export default Profile;