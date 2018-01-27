import React, { Component } from 'react';
import logo from './logo.svg';
import {firebaseApp} from './firebase';
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
import { Field } from 'bloomer/lib/elements/Form/Field/Field';
import { Control } from 'bloomer/lib/elements/Form/Control';
import { Select } from 'bloomer/lib/elements/Form/Select';
import { Button } from 'bloomer/lib/elements/Button';
import axios from 'axios';
import { Link } from 'react-router';
import {hashHistory} from 'react-router';
import { Image } from 'bloomer/lib/elements/Image';
import firebase from 'firebase';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            date: moment(),
            formattedDate: '',
            placeOrigin: '',
            placeDest: '',
            latlngOrigin: null,
            latlngDest: null,
            time: 'morning',
            priority: '',
        }
        this.handleDate = this.handleDate.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSelectPriorities = this.handleSelectPriorities.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.onChangeOrigin = (placeOrigin) => this.setState({ placeOrigin });
        this.onChangeDest = (placeDest) => this.setState({ placeDest });

    }

    componentDidMount() {
        
    }

    signOut() {
        firebaseApp.auth().signOut();
    }

    handleSelect(e) {
        e.preventDefault();
        const element = e.target.value;
        this.setState({
            time: element
        })
    }

    handleSelectPriorities(e) {
        e.preventDefault();
        var element = e.target.value;
        if (element === 'None'){
            element = '';
        }
        this.setState({
            priority: element
        })
    }

    handleDate(pickedDate) {
        console.log(pickedDate);
        this.setState({
            date: pickedDate,
        }, () => {
            var moment = this.state.date._d;
            var date = moment.getDate();
            date = date.toString();
            if (date.length === 1) {
                date = "0" + date;
            }
            var month = moment.getMonth() + 1;
            month = month.toString();
            if (month.length === 1) {
                month = "0" + month;
            }
            var year = moment.getFullYear();
            year = year.toString();
            var formattedDate = date + '-' + month + '-' + year;
            this.setState({
                formattedDate: formattedDate
            })
        });
    }

    submitForm(e){
        e.preventDefault();

        this.setState({
            isLoading: true,
        });
        
        if(this.state.placeOrigin === '' || this.state.placeDest === '') {
            alert("Please fill up all the fields");
            return;
        }

        if(this.state.formattedDate === '') {
            this.setState({
                date: moment(new Date()),
            }, () => {
                var moment = this.state.date._d;
                var date = moment.getDate();
                date = date.toString();
                if (date.length === 1) {
                    date = "0" + date;
                }
                var month = moment.getMonth() + 1;
                month = month.toString();
                if (month.length === 1) {
                    month = "0" + month;
                }
                var year = moment.getFullYear();
                year = year.toString();
                var formattedDate = date + '-' + month + '-' + year;
                this.setState({
                    formattedDate: formattedDate
                }, () => {
                    geocodeByAddress(this.state.placeOrigin)
                    .then(results => getLatLng(results[0]))
                    .then(latlngOrigin => {
                        this.setState({
                            latlngOrigin: latlngOrigin
                        }, () => {
                            var data = {
                                formattedDate: this.state.formattedDate,
                                time: this.state.time,
                                latitude: this.state.latlngOrigin.lat,
                                longitude: this.state.latlngOrigin.lng,
                                source: this.state.placeOrigin,
                                destination: this.state.placeDest,
                                priority: this.state.priority
                            }
                            console.log(data);
                    
                            axios.post('https://a62c40c4.ngrok.io/trips', {
                                data: data
                              }, {headers: {
                                  'Content-Type': 'application/json'
                              }})
                              .then(function (response) {
                                console.log(response);
                                localStorage.setItem('data', JSON.stringify(response));
                              })
                              .then(() => {
                                  hashHistory.push('/display');
                                //   this.props.history.push('/display');
                              })
                              .catch(function (error) {
                                console.log(error);
                              });
    
                        })
                    });
                })
            });
        } else {
            geocodeByAddress(this.state.placeOrigin)
            .then(results => getLatLng(results[0]))
            .then(latlngOrigin => {
                this.setState({
                    latlngOrigin: latlngOrigin
                }, () => {
                    var data = {
                        formattedDate: this.state.formattedDate,
                        time: this.state.time,
                        latitude: this.state.latlngOrigin.lat,
                        longitude: this.state.latlngOrigin.lng,
                        source: this.state.placeOrigin,
                        destination: this.state.placeDest,
                        priority: this.state.priority
                    }
                    console.log(data);
            
                    axios.post('https://a62c40c4.ngrok.io/trips', {
                        data: data
                      }, {headers: {
                          'Content-Type': 'application/json'
                      }})
                      .then(function (response) {
                        console.log(response);
                        localStorage.setItem('data', JSON.stringify(response));
                      })
                      .then(() => {
                        //   this.props.history.push('/display');
                          hashHistory.push('/display');
                      })
                      .catch(function (error) {
                        console.log(error);
                      });

                })
            });
        }

        






        // var longitude, latitude;
        
        // geocodeByAddress(this.state.placeOrigin)
        //     .then(results => getLatLng(results[0]))
        //         .then(latlngOrigin => {
        //             this.setState({
        //                 latlngOrigin: latlngOrigin
        //             }, () => {
        //                 var data = {
        //                     formatteDate: this.state.formattedDate,
        //                     time: this.state.time,
        //                     latitude: this.state.latlngOrigin.lat,
        //                     longitude: this.state.latlngOrigin.lng,
        //                     source: this.state.placeOrigin,
        //                     destination: this.state.placeDest,
        //                     priority: this.state.priority
        //                 }
                
        //                 axios.post('http://c122b9ef.ngrok.io/trips', {
        //                     data: data
        //                   }, {headers: {
        //                       'Content-Type': 'application/json'
        //                   }})
        //                   .then(function (response) {
        //                     console.log(response);
        //                   })
        //                   .catch(function (error) {
        //                     console.log(error);
        //                   });
        //             })
        //         });
        // geocodeByAddress(this.state.placeDest)
        // .then(results => getLatLng(results[0]))
        //     .then(latlngDest => {
        //         this.setState({
        //             latlngDest: latlngDest
        //         })
        //     });

        // if(this.state.formattedDate === '') {
        //     let today = moment(new Date());
        //     this.handleDate(today);
        // }
        // console.log(this.state.latlngOrigin);

        // var data = {
        //     formatteDate: this.state.formattedDate,
        //     time: this.state.time,
        //     // latitude: this.state.latlngOrigin.lat,
        //     // longitude: this.state.latlngOrigin.lng,
        //     source: this.state.placeOrigin,
        //     destination: this.state.placeDest,
        //     priority: this.state.priority
        // }

        // axios.post('http://c122b9ef.ngrok.io', {
        //     data: data
        //   }, {headers: {
        //       'Content-Type': 'application/json'
        //   }})
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
        
    }

    render() {
        const inputPropsOrigin = {
            value: this.state.placeOrigin,
            onChange: this.onChangeOrigin,
            placeholder: 'Enter Origin Location',
        }
        const inputPropsDest = {
            value: this.state.placeDest,
            onChange: this.onChangeDest,
            placeholder: 'Enter Destination Location',
        }
        // let username = firebase.auth().currentUser.toArray();
        // console.log(username);
        // username = username.currentUser.displayName;

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

        return (
            <div id = "outer-container">
                <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } width = {'400px'} right>
                        <a className = "hm-list">View your saved trips</a>
                        <a className = "hm-list hm-logout" onClick = {() => this.signOut()}  >Logout</a>
                </Menu>
                <div id = "page-wrap">
                <Navbar className = "navbar">
                    <NavbarBrand>
                    <Columns isCentered>
                    
                        <NavbarItem style={{marginLeft:10+ 'em'}}>
                            <img src={logo} className = "navbar-logo"/><span className = "logo-name">Trip-a-Treat</span>
                        </NavbarItem>

                    <Column isSize="1/4">
                        <NavbarItem className = "hidden-links" hasTextAlign='centered'>
                            <span className = "navbar-links">Welcome,</span>
                        </NavbarItem>
                    </Column>
                    <Column isSize="1/3">
                        <NavbarItem className = "hidden-links" hasTextAlign='centered'>
                            <span className = "navbar-links">User</span>

                        </NavbarItem>
                    </Column>
                    </Columns>
                    </NavbarBrand>
                    <NavbarMenu>
                        <NavbarEnd className = "profile-nav">
                            <NavbarItem>
                                <span className = "navbar-links">Welcome,</span>
                            </NavbarItem>
                            <NavbarItem>
                                <span className = "navbar-links">User</span>
                            </NavbarItem>
                        </NavbarEnd>
                    </NavbarMenu>
                </Navbar>
                <Columns isCentered><Column isCentered><Image style={{marginLeft:44+ 'em'}} isSize="128x128" src="https://www.gvsu.edu/cms4/asset/2BD867CE-07AE-8DD2-1022D33D00143BB8/icon_emergency1.png" /></Column></Columns>
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
                                inputProps={inputPropsOrigin}
                            />
                    </Column>
                </Columns>
                <Columns>
                    <Column isSize = {{desktop: 6, tablet: 8, mobile: 10}} isOffset = {{desktop: 3, tablet: 2, mobile: 1}}>
                        <p className = "profile-labels"> Where do you plan to end your journey : </p> <PlacesAutocomplete 
                                placeholder = 'Enter Location'
                                styles={myStyles}
                                inputProps={inputPropsDest}
                            />
                    </Column>
                </Columns>
                <Columns>
                    <Column isSize = {{desktop: 3, tablet: 4, mobile: 5}} isOffset = {{desktop: 3, tablet: 2, mobile: 1}}>
                        <p className = "profile-labels">When do you plan to leave tentatively :</p>
                        <Field>
                            <Control>
                                <Select onChange = {this.handleSelect}>
                                    <option >morning</option>
                                    <option >afternoon</option>
                                    <option >evening</option>
                                    <option >night</option>
                                </Select>
                            </Control>
                        </Field>
                    </Column>
                    <Column isSize = {{desktop: 3, tablet: 4, mobile:5}} isOffset = {{desktop: 1, tablet: 2, mobile: 1}}>
                        <p className = "profile-labels">Some priorities :</p>
                        <Field>
                            <Control>
                                <Select onChange = {this.handleSelectPriorities}>
                                    <option >None</option>
                                    <option >avoid-highways</option>
                                    <option >avoid-tolls</option>
                                </Select>
                            </Control>
                        </Field>
                    </Column>
                </Columns>
                <Columns>
                    <Column isSize = {{desktop: 6, tablet: 4, mobile:5}} isOffset = {{desktop: 5, tablet: 2, mobile: 1}}>
                        <Button className = "profile-submit" onClick = {this.submitForm} isLoading={this.state.isLoading} >Submit</Button>
                    </Column>
                </Columns>
            </div>
            </div>
        )
    }
}

export default Profile;