import React, { Component } from 'react';
import { withScriptjs ,withGoogleMap ,GoogleMap, Marker, Polyline, pathCoordinates, lineSymbol } from "react-google-maps";

class Display extends Component {
    render(){
        const json = JSON.parse(localStorage.getItem('data'));
        // console.log(json);
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
            <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />// Map with a Marker
        )
    }
}

export default Display;