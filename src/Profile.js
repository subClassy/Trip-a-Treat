import React, { Component } from 'react';
import logo from './logo.svg';
import hamburgerLogo from './burgerIcon.svg';
import {firebaseApp} from './firebase';
import * as firebase from 'firebase';
import './App.css';
import { Navbar } from 'bloomer/lib/components/Navbar/Navbar';
import { NavbarBrand } from 'bloomer/lib/components/Navbar/NavbarBrand';
import { NavbarItem } from 'bloomer/lib/components/Navbar/NavbarItem';
import { scaleDown as Menu } from 'react-burger-menu';
import { Columns } from 'bloomer/lib/grid/Columns';
import { Column } from 'bloomer/lib/grid/Column';
import { NavbarMenu } from 'bloomer/lib/components/Navbar/NavbarMenu';
import { NavbarEnd } from 'bloomer/lib/components/Navbar/NavbarEnd';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress,  getLatLng } from 'react-places-autocomplete'
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { Dropdown } from 'bloomer/lib/components/Dropdown/Dropdown';
import { DropdownTrigger } from 'bloomer/lib/components/Dropdown/DropdownTrigger';
import { Icon } from 'bloomer/lib/elements/Icon';
import { DropdownMenu } from 'bloomer/lib/components/Dropdown/Menu/DropdownMenu';
import { DropdownContent } from 'bloomer/lib/components/Dropdown/Menu/DropdownContent';
import { DropdownItem } from 'bloomer/lib/components/Dropdown/Menu/DropdownItem';
import { Button } from 'bloomer/lib/elements/Button';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment(),
            formattedDate: '',
            place: '',
            latlngOrigin: null,
            latlngDest: null,
        }
        this.handleDate = this.handleDate.bind(this);
        this.onChange = (place) => this.setState({ place })
    }

    signOut() {
        firebaseApp.auth().signOut();
    }

    handleDate(pickedDate) {
        console.log(pickedDate);
        this.setState({
            date: pickedDate,
        }, () => {
            var moment = this.state.date._d;
            var date = moment.getDate();
            date = date.toString();
            if (date.length == 1) {
                date = "0" + date;
            }
            var month = moment.getMonth() + 1;
            month = month.toString();
            if (month.length == 1) {
                month = "0" + month;
            }
            var year = moment.getFullYear();
            year = year.toString();
            var formattedDate = date + '-' + month + '-' + year;
            console.log(formattedDate);
        });
    }

    render() {
        const inputProps = {
            value: this.state.place,
            onChange: this.onChange,
            placeholder: 'Enter Location',
        }

        const myStyles = {
            root: { 
                fontSize: '17px' 
            },
            input: {
                borderTopLeftRadius: '5px',
                borderBottomLeftRadius: '5px',
                height: '34px',
                padding: '6px 12px',
                fontSize: '14px',
                lineHeight: '1.42857143',
                color: '#070221',
                backgroundColor: '#fff',
                backgroundImage: 'none',
                border: '1px solid #ccc',
                WebkitBoxShadow: 'inset 0 1px 1px rgba(0,0,0,.075)',
                boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075)',
                WebkitTransition: 'border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s',
                OTransition: 'border-color ease-in-out .15s,box-shadow ease-in-out .15s',
                transition: 'border-color ease-in-out .15s,box-shadow ease-in-out .15s'
            },
            autocompleteContainer: {
              zIndex: '5',
            },
        }

        const handleEnter = (place) => {
            geocodeByAddress(place)
            .then(results => getLatLng(results[0]))
            .then(latLng => 
                console.log('Success', latLng),
                // this.search(latLng)
            )
            .catch(error => console.error('Error', error))
            // console.log("hello");
            // this.search();
        }
        return (
            <div id = "outer-container">
                <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } width = {'400px'} right>
                        <a className = "hm-list">View your saved trips</a>
                        <a className = "hm-list">Post a ride at Bla Bla Car</a>
                        <a className = "hm-list hm-logout" onClick = {() => this.signOut()}  >Logout</a>
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
                            <span className = "navbar-links">No Name</span>
                        </NavbarItem>
                    </NavbarBrand>
                    <NavbarMenu>
                        <NavbarEnd className = "profile-nav">
                            <NavbarItem>
                                <span className = "navbar-links">Hello</span>
                            </NavbarItem>
                            <NavbarItem>
                                <span className = "navbar-links">No name</span>
                            </NavbarItem>
                        </NavbarEnd>
                    </NavbarMenu>
                </Navbar>
                <Columns>
                    <Column isSize = {{desktop: 6, tablet: 8, mobile: 10}} isOffset = {{desktop: 3, tablet: 2, mobile: 1}}>
                        <p className = "heading-profile">Lets plan your next trip</p>
                    </Column>
                </Columns>
                <Columns>
                    <Column isSize = {{desktop: 6, tablet: 8, mobile: 10}} isOffset = {{desktop: 3, tablet: 2, mobile: 1}}>
                        <p className = "profile-labels"> When do you plan to begin your journey : </p> <DatePicker 
                                                                            dateFormat = "DD/MM/YYYY"
                                                                            selected={this.state.date}
                                                                            onChange = {this.handleDate}
                                                                            className = "profile-inputs"
                                                                            />
                    </Column>
                </Columns>
                <Columns>
                    <Column isSize = {{desktop: 6, tablet: 8, mobile: 10}} isOffset = {{desktop: 3, tablet: 2, mobile: 1}}>
                        <p className = "profile-labels"> Where do you plan to begin your journey : </p> <PlacesAutocomplete 
                                placeholder = 'Enter Location'
                                styles={myStyles}
                                inputProps={inputProps} 
                                onEnterKeyDown={handleEnter}
                            />
                    </Column>
                </Columns>
                <Columns>
                    <Column isSize = {{desktop: 6, tablet: 8, mobile: 10}} isOffset = {{desktop: 3, tablet: 2, mobile: 1}}>
                        <p className = "profile-labels"> Where do you plan to end your journey : </p> <PlacesAutocomplete 
                                placeholder = 'Enter Location'
                                styles={myStyles}
                                inputProps={inputProps} 
                                onEnterKeyDown={handleEnter}
                            />
                    </Column>
                </Columns>
                <Columns>
                    <Column isSize = {{desktop: 6, tablet: 8, mobile: 10}} isOffset = {{desktop: 3, tablet: 2, mobile: 1}}>
                        <p className = "profile-labels">When do you plan to leave tentatively :</p>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button aria-haspopup = "true" aria-controls = "dropdown-menu">
                                <span> Choose one </span>
                                <Icon icon = "angle-down" isSize = "small" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownContent>
                                    <DropdownItem>Morning</DropdownItem>
                                    <DropdownItem>Afternoon</DropdownItem>
                                    <DropdownItem>Evening</DropdownItem>
                                    <DropdownItem>Night</DropdownItem>
                                </DropdownContent>
                            </DropdownMenu>
                        </Dropdown>
                    </Column>
                </Columns>
                </div>
            </div>
        )
    }
}

export default Profile;