import React, { useState, useCallback, memo, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { GOOGLEMAP_APIKEY } from '../../config';

const addMarker = (map) => {
  new window.google.maps.Marker({
    map,
    position: {
      lat: 21.028511,
      lng: 105.804817,
    },
    icon: {
      url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    },
  });
}
const createMarker = (place) => {
  if (!place.geometry || !place.geometry.location) return;
  const marker = new window.google.maps.Marker({
    map,
    position: place.geometry.location,
  });
}

const addSoccerFields = (map) => {
  const searchReq = {
    query: 'san bong',
    fields: ['icon']
  }
  const service = new window.google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(searchReq, (results, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  })  
}
const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLEMAP_APIKEY,
  });

  const [map, setMap] = useState(null);
  const [mapWidth, setMapWidth] = useState(0);
  
  const center = {
    lat: 21.028511,
    lng: 105.804817,
  };  
  const containerStyle = {
    width: `${mapWidth} px`,
    height: '500px',
  };

  useEffect(() => {
    setMapWidth(window.innerWidth);
  }, []);

  const onLoad = useCallback(function callback(map) {
    addSoccerFields(map);
    addMarker(map);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default memo(Map);
