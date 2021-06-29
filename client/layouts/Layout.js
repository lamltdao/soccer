import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 700,
  },
  rootPadding: {
    minHeight: 700,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  }
}));

const Layout = ({ children, stickToSide }) => {
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <div className={stickToSide ? classes.root : classes.rootPadding}>
        {children}
      </div>
      <Footer />
    </>
  )
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  stickToSide: PropTypes.bool,
};

Layout.defaultProps = {
  stickToSide: true,
}

export default Layout;
