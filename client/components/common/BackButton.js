import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.success.main,  
    }  
  },
}));

const BackButton = ({ onClick }) => {
  const classes = useStyles();
  return (
    <Button variant="outlined" className={classes.root} onClick={onClick}>
      <Typography color="secondary">
        Back
      </Typography>
    </Button>
  );
};

BackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BackButton;
