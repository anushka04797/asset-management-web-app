import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component, useState } from 'react'
// import {API} from '../../Config'
const MapContainer = (props) => {
    const [markers,setMarkers]=useState([])
    const onMarkerClick = () => {

    }
    const onInfoWindowClose = () => {

    }
    React.useEffect(()=>{
        // API.get('agentlocation').then((res)=>{
        //     console.log(res.data)
        //     setMarkers(res.data.data)
        // })
    },[])
    return (
        <>
            <div style={{overflowY:'hidden'}}>
                <Map google={props.google} zoom={14} initialCenter={{
                    lat: 23.8103,
                    lng: 90.4124
                }}>
                <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'SOMA'}
                    position={{lat: 23.8103, lng: 90.4124}} />
                    <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'SOMA'}
                    position={{lat: 23.8103, lng: 90.4122}} />
                    <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'SOMA'}
                    position={{lat: 23.8103, lng: 90.4121}} />
                </Map>
            </div>
        </>
    );
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAChn6tArJ-qTOKRZ1xhK0P9cumPrOjVfQ')
})(MapContainer)



// class GoogleMapAgentTrack extends Component {
//     state = {
//         showingInfoWindow: false,
//         activeMarker: {},
//         selectedPlace: {},
//     };

//     onMarkerClick = (props, marker, e) =>
//         this.setState({
//             selectedPlace: props,
//             activeMarker: marker,
//             showingInfoWindow: true
//         });

//     onMapClicked = (props) => {
//         if (this.state.showingInfoWindow) {
//             this.setState({
//                 showingInfoWindow: false,
//                 activeMarker: null
//             })
//         }
//     };

//     render() {
//         return (
//             <Map google={this.props.google}
//                 onClick={this.onMapClicked}>
//                 <Marker onClick={this.onMarkerClick}
//                     name={'Current location'} />

//                 <InfoWindow
//                     marker={this.state.activeMarker}
//                     visible={this.state.showingInfoWindow}>
//                     <div>
//                         <h1>{this.state.selectedPlace.name}</h1>
//                     </div>
//                 </InfoWindow>
//             </Map>
//         )
//     }
// }

// export default GoogleMapAgentTrack