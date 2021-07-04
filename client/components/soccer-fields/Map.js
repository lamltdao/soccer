import React, { useCallback, memo, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import {
  GOOGLEMAP_APIKEY,
  HANOI_CENTER_COORDINATE,
  SOCCERFIELDS_STATUS,
} from "../../constants";
import {
  makeStyles,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

// SEARCH FIELD COMPONENT
const useSearchFieldStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    maxWidth: 1000,
    minHeight: 400,
    margin: "auto",
    marginTop: theme.spacing(2),
    zIndex: 1,
    position: "relative",
  },
  searchFieldTitle: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  searchFieldContainer: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  searchBtnContainer: {
    textAlign: "center",
  },
  searchBtn: {
    backgroundColor: theme.palette.success.main,
    minWidth: 200,
    "&:hover": {
      backgroundColor: theme.palette.success.light,
    },
  },
  queryTextfield: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.secondary.main,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.success.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.success.main,
      },
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.secondary.main,
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
  },
  selectStatusMenu: {
    "& .MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover": {
      backgroundColor: theme.palette.success.light,
    },
    "& .MuiListItem-root": {
      backgroundColor: theme.palette.info.main,
    },
    "& .MuiList-padding": {
      padding: 0,
    },
  },
}));

const SearchField = ({ open }) => {
  const classes = useSearchFieldStyles();
  const [numShown, setNumShown] = useState(0);
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  const handleNumberInputChange = (e, setter) => {
    e.preventDefault();
    setter(e.target.value);
  };
  return open ? (
    <div className={classes.root}>
      <Typography
        className={classes.searchFieldTitle}
        variant="h4"
        color="secondary"
      >
        Filter options
      </Typography>
      <Grid
        container
        spacing={5}
        direction="column"
        alignItems="stretch"
        className={classes.searchFieldContainer}
      >
        <Grid item xs={12}>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={2}>
              <Typography color="secondary">Your location:</Typography>
            </Grid>
            <Grid item xs={10}>
              <StandaloneSearchBox
                bounds={
                  new google.maps.LatLngBounds(null, {
                    lat: 21.028511,
                    lng: 105.804817,
                  })
                }
              >
                <TextField
                  className={classes.queryTextfield}
                  color="secondary"
                  style={{ width: "100%" }}
                  variant="outlined"
                />
              </StandaloneSearchBox>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={2}>
              <Typography color="secondary">Other locations:</Typography>
            </Grid>
            <Grid item xs={10}>
              <StandaloneSearchBox>
                <TextField
                  className={classes.queryTextfield}
                  color="secondary"
                  style={{ width: "100%" }}
                  variant="outlined"
                />
              </StandaloneSearchBox>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" alignItems="center" spacing={3}>
            {/** # fields shown */}
            <Grid item xs={4}>
              <Grid container direction="row" spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <Typography color="secondary">
                    # soccer fields shown:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  {/** WIll be replaced by StandaloneSearchbox */}
                  <TextField
                    className={classes.queryTextfield}
                    color="secondary"
                    style={{ width: "100%" }}
                    variant="outlined"
                    type="number"
                    error={numShown < 0}
                    value={numShown}
                    onChange={(e) => handleNumberInputChange(e, setNumShown)}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/** price range */}
            <Grid item xs={5}>
              <Grid container direction="row" alignItems="center" spacing={1}>
                <Grid item xs={4}>
                  <Typography color="secondary">Price range (VND):</Typography>
                </Grid>
                <Grid item xs={4}>
                  {/** WIll be replaced by StandaloneSearchbox */}
                  <TextField
                    className={classes.queryTextfield}
                    color="secondary"
                    style={{ width: "100%" }}
                    variant="outlined"
                    label="From"
                    type="number"
                    error={fromPrice > toPrice || fromPrice < 0}
                    value={fromPrice}
                    onChange={(e) => handleNumberInputChange(e, setFromPrice)}
                  />
                </Grid>
                <Grid item xs={4}>
                  {/** WIll be replaced by StandaloneSearchbox */}
                  <TextField
                    className={classes.queryTextfield}
                    color="secondary"
                    style={{ width: "100%" }}
                    variant="outlined"
                    label="To"
                    type="number"
                    error={fromPrice > toPrice || toPrice < 0}
                    value={toPrice}
                    onChange={(e) => handleNumberInputChange(e, setToPrice)}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/** status */}
            <Grid item xs={3}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={4}>
                  <Typography color="secondary">Status:</Typography>
                </Grid>
                <Grid item xs={8}>
                  {/** WIll be replaced by StandaloneSearchbox */}
                  <TextField
                    className={classes.queryTextfield}
                    color="secondary"
                    style={{ width: "100%" }}
                    variant="outlined"
                    label="Status"
                    select
                    defaultValue={SOCCERFIELDS_STATUS.All}
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          className: classes.selectStatusMenu,
                        },
                      },
                    }}
                  >
                    <MenuItem value={SOCCERFIELDS_STATUS.All}>
                      <Typography color="secondary">All</Typography>
                    </MenuItem>
                    <MenuItem value={SOCCERFIELDS_STATUS.Vacant}>
                      <Typography color="secondary">Vacant</Typography>
                    </MenuItem>
                    <MenuItem value={SOCCERFIELDS_STATUS.Full}>
                      <Typography color="secondary">Full</Typography>
                    </MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.searchBtnContainer}>
          <Button variant="outlined" className={classes.searchBtn}>
            <Typography color="secondary">Search</Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  ) : (
    <></>
  );
};

SearchField.propTypes = {
  open: PropTypes.bool.isRequired,
};

// TOGGLE SEARCH FIELD COMPONENT
const useToggleSearchFieldStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.success.main,
    },
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  icon: {
    color: theme.palette.secondary.main,
  },
}));

const ToggleSearchField = ({ onClick, open }) => {
  const classes = useToggleSearchFieldStyles();
  return (
    <Button onClick={onClick} variant="outlined" className={classes.root}>
      <Typography variant="h6" color="secondary">
        Filter Options
      </Typography>
      {open ? (
        <ArrowDropUpIcon className={classes.icon} />
      ) : (
        <ArrowDropDownIcon className={classes.icon} />
      )}
    </Button>
  );
};

ToggleSearchField.propTypes = {
  onClick: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

// MAPS COMPONENT
const libs = ["places"];
const Map = ({ soccerFields, setSoccerFields }) => {
  // LOAD API
  const libRef = React.useRef(libs);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLEMAP_APIKEY,
    libraries: libRef.current, // Use Places API
  });

  /**
   * instance of map
   * currently get 1 place by query
   * later will be fetching to DB
   * @param {*} map
   */
  const getSoccerFields = (map) => {
    const searchReq = {
      query: "san bong",
      fields: ["name", "place_id", "geometry"],
      locationBias: {
        center: HANOI_CENTER_COORDINATE,
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

  // Set map container dimension
  const containerStyle = {
    height: "500px",
  };

  const [searchFieldOpen, setSearchFieldOpen] = useState(true);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
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
              label={name}
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
  soccerFields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      position: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
      }),
      color: PropTypes.string,
    })
  ).isRequired,
  setSoccerFields: PropTypes.func.isRequired,
};
export default memo(Map);
