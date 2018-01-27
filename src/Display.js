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


class Display extends Component {
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
                    <Column isSize = {{default: 8}} isOffset = {{default: 2}}>
                    <MyMapComponent
                        isMarkerShown
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px`, width: `800px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                    </Column>
                    <Column>
                    <p className = "profile-labels">Alternative Routes</p><br />
                    {json.data.map((currentRoute, k) => {
                        return (
                            <div>
                            {
                                (k !== 0) ? <p className = "profile-labels">{k}) Via {json.data[k].summary}. Distance - {json.data[k].legs[0].distance.text}. Time - {json.data[k].legs[0].duration.text}</p> : <p></p>
                            }
                            </div>
                        )
                    })}
                    </Column>
                </Columns>
                <Columns>
                    <Column isSize = {{default: 8}} isOffset = {{default: 2}}>
                        <p className = "profile-labels"> You must depart at {time} on {json.data[0].date}.</p>
                    </Column>
                </Columns>
                <Columns>
                    <Column isSize = {{default: 8}} isOffset = {{default: 2}}>
                        <p className = "profile-labels">Expected weather should be *sunny*.</p>
                    </Column>
                </Columns>
                <Columns>
                    <Column isSize = {{default: 8}} isOffset = {{default: 2}}>
                        <p className = "profile-labels">On this route you will be mostly travelling on {json.data[0].summary}</p>
                    </Column>
                </Columns>
            </div>
            </div>
        )
    }
}

export default Display;