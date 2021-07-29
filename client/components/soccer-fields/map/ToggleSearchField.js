import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Typography, Button } from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles((theme) => ({
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
  const classes = useStyles();
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

export default ToggleSearchField;
