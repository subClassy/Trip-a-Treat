import React, { Component } from 'react';
import { withScriptjs ,withGoogleMap ,GoogleMap, Marker, Polyline, pathCoordinates, lineSymbol } from "react-google-maps";
import { Navbar } from 'bloomer/lib/components/Navbar/Navbar';
import { NavbarBrand } from 'bloomer/lib/components/Navbar/NavbarBrand';
import { NavbarItem } from 'bloomer/lib/components/Navbar/NavbarItem';
import { scaleDown as Menu } from 'react-burger-menu';
import { Columns } from 'bloomer/lib/grid/Columns';
import { Column } from 'bloomer/lib/grid/Column';
import { NavbarMenu } from 'bloomer/lib/components/Navbar/NavbarMenu';
import { NavbarEnd } from 'bloomer/lib/components/Navbar/NavbarEnd';
import './App.css';
import logo from './logo.svg';
import {firebaseApp} from './firebase';
import axios from 'axios';
import { Container } from 'bloomer/lib/layout/Container';
import firebase from 'firebase';



class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants : null,
            doctors: null,
            gasStation: null,
            atm: null,
        }
        this.isValid = this.isValid.bind(this);
    }
 
    isValid() {
        if(this.state.restaurants !== null) {
            return true
        }
        else {
            return false
        }
    }

    signOut() {
        firebaseApp.auth().signOut();
    }

    componentDidMount() {
        var data = (JSON.parse(localStorage.getItem('data'))).data[0];
        var start_address = data.legs[0].start_address;
        var end_address = data.legs[0].end_address;
        axios.post('http://a62c40c4.ngrok.io/poi', {
            source: start_address,
            destination: end_address,
            type: 'restaurant',
        }).then(response => {
            this.setState({
                restaurants: response
            })
            console.log(response);
            let box = document.getElementById("restaurant");
            for (let j = 0; j < 1; j++) {
                let element = response.data[j];
                console.log("went");
                    for (let i = 0; i < element.results.length; i++) {
                        var para = document.createElement("P");                        
                        var t = document.createTextNode(element.results[i].name);
                        if (t !== null) {
                            para.appendChild(t);
                            if (para !== null) {
                                box.appendChild(para);
                            }
                        }
                    }
                    
                
            }
        })
        axios.post('https://a62c40c4.ngrok.io/poi', {
            source: start_address,
            destination: end_address,
            type: 'hospital',
        }).then(response => {
            this.setState({
                doctors: response
            })
            let box = document.getElementById("hospitals");
            for (let j = 0; j < 1; j++) {
                let element = response.data[j];
                console.log("went");
                    for (let i = 0; i < element.results.length; i++) {
                        var para = document.createElement("P");                        
                        var t = document.createTextNode(element.results[i].name);
                        if (t !== null) {
                            para.appendChild(t);
                            if (para !== null) {
                                box.appendChild(para);
                            }
                        }
                    }
                    
                
            }
        })
        axios.post('https://a62c40c4.ngrok.io/poi', {
            source: start_address,
            destination: end_address,
            type: 'gas_station',
        }).then(response => {
            this.setState({
                gasStation: response
            })
            let box = document.getElementById("gas-stations");
            for (let j = 0; j < 1; j++) {
                let element = response.data[j];
                console.log("went");
                    for (let i = 0; i < element.results.length; i++) {
                        var para = document.createElement("P");                        
                        var t = document.createTextNode(element.results[i].name);
                        if (t !== null) {
                            para.appendChild(t);
                            if (para !== null) {
                                box.appendChild(para);
                            }
                        }
                    }
                    
                
            }
        })
        axios.post('https://a62c40c4.ngrok.io/poi', {
            source: start_address,
            destination: end_address,
            type: 'atm',
        }).then(response => {
            this.setState({
                atm: response
            })
            let box = document.getElementById("atm");
            for (let j = 0; j < 1; j++) {
                let element = response.data[j];
                console.log("went");
                    for (let i = 0; i < element.results.length; i++) {
                        var para = document.createElement("P");                        
                        var t = document.createTextNode(element.results[i].name);
                        if (t !== null) {
                            para.appendChild(t);
                            if (para !== null) {
                                box.appendChild(para);
                            }
                        }
                    }
                    
                
            }
        })
    }

    handleSave() {
        var text = prompt('Do you want it to be shareable(true/false) ?');
        var uid = localStorage.getItem('userId');
        var data = (JSON.parse(localStorage.getItem('data'))).data[0];
        data.isSearchable = text;
        axios.post('https://a62c40c4.ngrok.io/save-trip', {
            json : data
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log(response);
        });
    }

    render(){
        const json = JSON.parse(localStorage.getItem('data'));
        console.log(json);
        var time = json.data[0].time;
        if(time.length === 1) {
            time = '0' + time + ':00 AM';
        }
        else {
            if(time <= 11) {
                time = time + ':00 AM';
            }
            else {
                time = time + ':00 PM';
            }
        }
        var finalData = json.data[0].legs[0].steps;
        console.log(finalData);
        var pathCoordinates = [];
        pathCoordinates.push(json.data[0].legs[0].start_location);
        const center = {
            lat: pathCoordinates[0].lat,
            lng: pathCoordinates[0].lng
        };
        console.log(center);
        for(var i = 0; i< finalData.length; i++) {
            pathCoordinates.push(finalData[i].start_location);
            pathCoordinates.push(finalData[i].end_location);
        }
        pathCoordinates.push(json.data[0].legs[0].end_location);
        const MyMapComponent = withScriptjs(withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={8}
                defaultCenter={center}
            >
                {
                    <Polyline 
                        path={pathCoordinates}
                        geodesic={true} 
                        options={{ 
                              strokeColor: '#ff2527',
                              strokeOpacity: 1,
                              strokeWeight: 2,
                              icons: [{ 
                                        icon: lineSymbol,
                                        offset: '0',
                                        repeat: '20px'
                                     }],
                            }}
                    /> 
                }
            </GoogleMap>
        ))
        return(
            <div id = "outer-container">
                <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } width = {'400px'} right>
                        <a className = "hm-list">View your saved trips</a>
                        <a className = "hm-list" onClick = {this.handleSave}>Save Trip</a>
                        <a className = "hm-list" >View Restaurants on the route</a>
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
                <Columns style={{marginLeft:23+ 'em'}}>
                <p className = "profile-labels" hasTextAlign='centered'>Your most optimum path is shown and You must depart at {time} on {json.data[0].date}.</p>
                </Columns>
                <Columns>
                    <Column isSize = {{default: 9}} isOffset = {{default: 3}}>
                    <MyMapComponent
                        isMarkerShown
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px`, width: `800px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                    </Column>
                </Columns>
                <Container>
                <Columns>
                    <Column>
                    <p className = "profile-labels">Alternative Routes:
                    {json.data.map((currentRoute, k) => {
                        return (
                            <div>
                            {
                                (k !== 0) ? <p className = "profile-labels" style={{marginLeft:10+ 'em'}}>{k}) Via {json.data[k].summary}. Distance - {json.data[k].legs[0].distance.text}. Time - {json.data[k].legs[0].duration.text}</p> : <p></p>
                            }
                            </div>
                        )
                    })}
                    </p>
                    </Column>
                </Columns>
                <Columns>

                    <Column>
                        <p className = "profile-labels">Expected weather should be {json.data[0].weather}.</p>

                    </Column>
                </Columns>
                <Columns>
                    <Column>
                        <p className = "profile-labels">On this route you will be mostly travelling on {json.data[0].summary}</p>
                    </Column>
                </Columns>
                </Container>
                {/* ({this.isValid()}) ?
                <div>
                    {
                        this.state.restaurants.data.map((currentrest, k) => {
                            return (
                                <div>
                                    {
                                        (currentrest.status !== "ZERO_RESULTS") ? currentrest.results.map((currrest, k) => {
                                            return ( <p>{currrest.name}</p>)
                                        }) : <p></p>
                                    }
                                </div>
                            )
                        })
                    }
                </div> : <div></div> */}
                <div id="restaurant" className="profile-labels"  style={{marginLeft:5+ 'em'}}><p className = "headers-poi">Restaurants</p></div>
                <hr/>
                <div id="atm" className="profile-labels"  style={{marginLeft:5+ 'em'}}><p className = "headers-poi">ATM</p></div>
                <hr/>
                <div id="hospitals" className="profile-labels"  style={{marginLeft:5+ 'em'}}><p className = "headers-poi">Hospitals</p></div>
                <hr/>
                <div id="gas-stations" className="profile-labels"  style={{marginLeft:5+ 'em'}}><p className = "headers-poi">Gas Stations</p></div>
            </div>
            </div>
        )
    }
}

export default Display;