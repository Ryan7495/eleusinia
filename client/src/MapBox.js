import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import styled from 'styled-components';
import './MapBox.css';

export const MapContainer = styled.div`
    position: absolute;
    top: 10;
    right: 0;
    left: 0;
    bottom: 10;
    height: 600px;
`;

mapboxgl.accessToken = 'pk.eyJ1Ijoia2lyc3RlbnJpY2hhcmQiLCJhIjoiY2s5aGRkNXpmMHhmcDNtbnd0ejdudTAzOCJ9.Arrw97lli9Npu-6Aear32g';

class MapBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
          lng: -63.5834,
          lat: 44.6552,
          zoom: 11.74
        };
      }

      componentDidMount() {
        const map = new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [this.state.lng, this.state.lat],
          zoom: this.state.zoom
        });
        map.on('move', () => {
            this.setState({
              lng: map.getCenter().lng.toFixed(4),
              lat: map.getCenter().lat.toFixed(4),
              zoom: map.getZoom().toFixed(2)
            });
          });
      }

      render() {
        return (
            <MapContainer id="map" ref={el => this.mapContainer = el} />
        )
      }
  }
  
export default MapBox;