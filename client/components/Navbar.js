import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import { FEATURES } from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  homeIconButton: {
    marginRight: theme.spacing(5),
  },
  title: {
    flexGrow: 1,
  },
  featureLink: {
    backgroundColor: theme.palette.success.main,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const router = useRouter();
  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path);
  };
  const [feature, setFeature] = useState("");
  useEffect(() => {
    // path name return "/feature" => remove "/" from path name
    const getFeatureFromURL = window.location.pathname.substring(1);
    setFeature(getFeatureFromURL);
  }, []);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={1}>
              <IconButton
                edge="start"
                className={classes.homeIconButton}
                color="inherit"
                aria-label="menu"
              >
                <Link href="/">
                  <a style={{ textDecoration: "none", color: "white" }}>
                    <HomeIcon />
                  </a>
                </Link>
              </IconButton>
            </Grid>
            <Grid item xs={8}>
              <Grid container direction="row" justify="flex-start" spacing={2}>
                <Grid
                  item
                  className={
                    feature === FEATURES.SOCCERFIELDS && classes.featureLink
                  }
                >
                  <Button onClick={(e) => handleClick(e, "/soccer-fields")}>
                    <Typography
                      variant="h6"
                      className={classes.title}
                      color="secondary"
                    >
                      Soccer
                    </Typography>
                  </Button>
                </Grid>
                <Grid
                  item
                  className={
                    feature === FEATURES.LEAGUES_TOURNAMENTS &&
                    classes.featureLink
                  }
                >
                  <Button
                    onClick={(e) => handleClick(e, "/leagues-tournaments")}
                  >
                    <Typography
                      variant="h6"
                      className={classes.title}
                      color="secondary"
                    >
                      Leagues/Tournaments
                    </Typography>
                  </Button>
                </Grid>
                <Grid
                  item
                  className={feature === FEATURES.BLOGS && classes.featureLink}
                >
                  <Button onClick={(e) => handleClick(e, "/blogs")}>
                    <Typography
                      variant="h6"
                      className={classes.title}
                      color="secondary"
                    >
                      Blogs
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid container direction="row" justify="flex-end" spacing={2}>
                <Grid
                  item
                  className={feature === FEATURES.LOGIN && classes.featureLink}
                >
                  <Link href="/login">
                    <a style={{ textDecoration: "none" }}>
                      <Typography color="secondary">Login</Typography>
                    </a>
                  </Link>
                </Grid>
                <Grid
                  item
                  className={feature === FEATURES.SIGNUP && classes.featureLink}
                >
                  <Link href="/signup">
                    <a style={{ textDecoration: "none" }}>
                      <Typography color="secondary">Sign up</Typography>
                    </a>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
