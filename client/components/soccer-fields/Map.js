import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  StandaloneSearchBox,
} from '@react-google-maps/api';
import { GOOGLEMAP_APIKEY } from '../../config';
import { useWindowSize } from '../../hooks/use-window-size';

const Map = ({ soccerFields, setSoccerFields }) => {
  // LOAD API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLEMAP_APIKEY,
    libraries: ['places'], // Use Places API
  });

  /**
   * instance of map
   * currently get 1 place by query
   * later will be fetching from DB
   * @param {*} map
   */
  const getSoccerFields = (map) => {
    const searchReq = {
      query: 'san bong',
      fields: ['name', 'place_id', 'geometry'],
      locationBias: {
        center: {
          lat: 21.028511,
          lng: 105.804817,
        },
        radius: 5000, // meter
      },
    };
    const service = new window.google.maps.places.PlacesService(map);
    // bc a req to find multiple places is charged, we will fetch them first and store info in db
    service.findPlaceFromQuery(searchReq, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const loadedSoccerFields = [];
        results.map((result) => {
          const { name, place_id, geometry } = result;
          const lat = geometry.location.lat();
          const lng = geometry.location.lng();
          loadedSoccerFields.push({
            name,
            position: {
              lat,
              lng,
            },
            color: 'green',
          });
        });
        setSoccerFields((prev) => {
          return [...prev, ...loadedSoccerFields];
        });
      }
    });
  };

  // Run when map is loaded
  const onLoad = useCallback((map) => {
    getSoccerFields(map);
  }, []);

  // Run when map is unmounted
  const onUnmount = useCallback((map) => {}, []);

  // Set center coordinate
  const center = {
    lat: 21.028511,
    lng: 105.804817,
  };

  // Set map container dimension
  const containerWidth = useWindowSize().width;
  const containerStyle = {
    width: `${containerWidth}px`,
    height: '500px',
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <>
        <StandaloneSearchBox>
          <input
            type="text"
            placeholder="Customized your placeholder"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: 'absolute',
              left: '50%',
              marginLeft: '-120px',
            }}
          />
        </StandaloneSearchBox>
        {soccerFields.map((field, idx) => {
          const { name, position, color } = field;
          return (
            <Marker
              key={idx}
              position={position}
              icon={{
                url: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
                labelOrigin: {
                  x: 95,
                  y: 20,
                },
              }}
              label={{
                text: name,
                color: 'green',
              }}
            />
          );
        })}
      </>
    </GoogleMap>
  ) : (
    <></>
  );
};

Map.propTypes = {
  soccerFields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    color: PropTypes.string,
  })).isRequired,
  setSoccerFields: PropTypes.func.isRequired,
}
export default memo(Map);
