import React, { useState } from "react";
import PropTypes from "prop-types";
import { StandaloneSearchBox } from "@react-google-maps/api";
import {
  HANOI_CENTER_COORDINATE,
  SOCCERFIELDS_STATUS,
} from "../../../constants";
import {
  makeStyles,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
  const classes = useStyles();
  const [numShown, setNumShown] = useState(0);
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);
  const [yourLocation, setYourLocation] = useState("");
  const [otherLocation, setOtherLocation] = useState("");
  const [otherLocations, setOtherLocations] = useState([]);

  const handleInputChange = (e, setter) => {
    e.preventDefault();
    setter(e.target.value);
  };

  const handleAddOtherLocation = (e) => {
    e.preventDefault();
    setOtherLocations((prevLocations) => {
      return [...prevLocations, otherLocation];
    });
    setOtherLocation("");
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
                  new google.maps.LatLngBounds(null, HANOI_CENTER_COORDINATE)
                }
              >
                <TextField
                  className={classes.queryTextfield}
                  color="secondary"
                  style={{ width: "100%" }}
                  variant="outlined"
                  value={yourLocation}
                  onChange={(e) => handleInputChange(e, setYourLocation)}
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
                  value={otherLocation}
                  onChange={(e) => handleInputChange(e, setOtherLocation)}
                />
              </StandaloneSearchBox>
              <Button variant="outlined" onClick={handleAddOtherLocation}>
                <Typography>Add location</Typography>
              </Button>
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
                  <TextField
                    className={classes.queryTextfield}
                    color="secondary"
                    style={{ width: "100%" }}
                    variant="outlined"
                    type="number"
                    error={numShown < 0}
                    value={numShown}
                    onChange={(e) => handleInputChange(e, setNumShown)}
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
                  <TextField
                    className={classes.queryTextfield}
                    color="secondary"
                    style={{ width: "100%" }}
                    variant="outlined"
                    label="From"
                    type="number"
                    error={fromPrice > toPrice || fromPrice < 0}
                    value={fromPrice}
                    onChange={(e) => handleInputChange(e, setFromPrice)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    className={classes.queryTextfield}
                    color="secondary"
                    style={{ width: "100%" }}
                    variant="outlined"
                    label="To"
                    type="number"
                    error={fromPrice > toPrice || toPrice < 0}
                    value={toPrice}
                    onChange={(e) => handleInputChange(e, setToPrice)}
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

export default SearchField;
