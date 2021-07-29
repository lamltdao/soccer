import React, { useCallback, memo, useState, useContext } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { GOOGLEMAP_APIKEY, HANOI_CENTER_COORDINATE } from "../../../constants";
import SearchField from "./SearchField";
import ToggleSearchField from "./ToggleSearchField";
import { SoccerFieldsContext } from "../../../contexts/SoccerFieldsProvider";

// MAPS COMPONENT
const libs = ["places"];
const Map = () => {
  // LOAD API
  const libRef = React.useRef(libs);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLEMAP_APIKEY,
    libraries: libRef.current, // Use Places API
  });

  const { soccerFields, setSoccerFields } = useContext(SoccerFieldsContext);
  /**
   * instance of map
   * currently get 1 place by query
   * later will be fetching to DB
   * @param {*} map
   */
  const getSoccerFields = (map) => {
    const searchReq = {
      query: "san bong",
      fields: [
        "name",
        "address_components",
        "adr_address",
        "formatted_address",
        "geometry",
        "international_phone_number",
        "formatted_phone_number",
      ],
      locationBias: {
        center: HANOI_CENTER_COORDINATE,
        radius: 5000, // meter
      },
    };
    const service = new window.google.maps.places.PlacesService(map);
    // bc a req to find multiple places is charged, we will fetch them first and store info in db
    service.findPlaceFromQuery(searchReq, (results, status) => {
      console.log(results);
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
            color: "green",
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
    console.log("loaded");
    getSoccerFields(map);
  }, []);

  // Run when map is unmounted
  const onUnmount = useCallback((map) => {}, []);

  const [searchFieldOpen, setSearchFieldOpen] = useState(true);

  const renderSoccerFieldMarkers = (list) => {
    return list.map((field, idx) => {
      const { name, position, color } = field;
      return (
        <Marker
          key={idx}
          position={position}
          icon={{
            url: `http://maps.google.com/mapfiles/ms/icons/${
              color ? color : "green"
            }-dot.png`,
            labelOrigin: {
              x: 95,
              y: 20,
            },
          }}
          label={name}
        />
      );
    });
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        height: "500px",
      }}
      center={HANOI_CENTER_COORDINATE}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <>
        <ToggleSearchField
          open={searchFieldOpen}
          onClick={(e) => {
            e.preventDefault();
            setSearchFieldOpen(!searchFieldOpen);
          }}
        />
        <SearchField open={searchFieldOpen} />
        {renderSoccerFieldMarkers(soccerFields)}
      </>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default memo(Map);
