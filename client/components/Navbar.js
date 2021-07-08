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
  Avatar,
} from "@material-ui/core";
import { FEATURES } from "../constants";
import useUser from "../hooks/use-user";
import useRequest from "../hooks/use-request";

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
  featureLinkHighlight: {
    backgroundColor: theme.palette.success.main,
  },
  featureLink: {},
}));

const Navbar = () => {
  const { user } = useUser();
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

  const { doRequest } = useRequest({
    url: "/api/auth/logout",
    method: "delete",
    body: {},
    onSuccess: () => router.push("/login"),
  });

  const LogOut = async (e) => {
    e.preventDefault();
    await doRequest();
  };
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
                    feature === FEATURES.SOCCERFIELDS
                      ? classes.featureLinkHighlight
                      : classes.featureLink
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
                    feature === FEATURES.LEAGUES_TOURNAMENTS
                      ? classes.featureLinkHighlight
                      : classes.featureLink
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
                  className={
                    feature === FEATURES.BLOGS
                      ? classes.featureLinkHighlight
                      : classes.featureLink
                  }
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
              {user ? (
                <Grid
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <Avatar
                      style={{ backgroundColor: "green" }}
                    >{`${user.name[0]}`}</Avatar>
                  </Grid>
                  <Grid item>
                    <Typography>{user.username}</Typography>
                  </Grid>
                  <Grid item>
                    <Button onClick={LogOut}>
                      <Typography color="secondary">Log out</Typography>
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Grid container direction="row" justify="flex-end" spacing={2}>
                  <Grid
                    item
                    className={
                      feature === FEATURES.LOGIN
                        ? classes.featureLinkHighlight
                        : classes.featureLink
                    }
                  >
                    <Link href="/login">
                      <a style={{ textDecoration: "none" }}>
                        <Typography color="secondary">Login</Typography>
                      </a>
                    </Link>
                  </Grid>
                  <Grid
                    item
                    className={
                      feature === FEATURES.SIGNUP
                        ? classes.featureLinkHighlight
                        : classes.featureLink
                    }
                  >
                    <Link href="/signup">
                      <a style={{ textDecoration: "none" }}>
                        <Typography color="secondary">Sign up</Typography>
                      </a>
                    </Link>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
