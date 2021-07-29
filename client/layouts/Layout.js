import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { makeStyles } from '@material-ui/core';
import { FEATURES } from '../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 700,
  },
}));

const Layout = ({ children, user }) => {
  const classes = useStyles();
  return (
    <>
      <Navbar user={user}/>
      <div className={classes.root}>{children}</div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default Layout;
