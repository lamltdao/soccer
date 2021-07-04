import React from "react";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { makeStyles } from "@material-ui/core";
import { FEATURES } from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 700,
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <div className={classes.root}>{children}</div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
