import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/dist/client/link';
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  }
}));

const BackButton = ({ href }) => {
  const classes = useStyles();
  return (
    <Button variant="outlined" className={classes.root}>
      <Link href={href}>
        <a style={{ textDecoration: 'none', color: 'white'}}>
          Back
        </a>
      </Link>
    </Button>
  );
};

BackButton.propTypes = {
  href: PropTypes.string.isRequired,
};

export default BackButton;
