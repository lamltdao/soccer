import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';

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
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.homeIconButton}
            color="inherit"
            aria-label="menu"
          >
            <Link href="/">
              <a style={{ textDecoration: 'none', color: 'white' }}>
                <HomeIcon />
              </a>
            </Link>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Soccer
          </Typography>
          <Grid container direction="row" justify="flex-end" spacing={2}>
            <Grid item>
              <Link href="/login">
                <a style={{ textDecoration: 'none' }}>
                  <Typography color="secondary">Login</Typography>
                </a>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup">
                <a style={{ textDecoration: 'none' }}>
                  <Typography color="secondary">Sign up</Typography>
                </a>
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
