import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Grid,
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

const Footer = () => {
  return (
    <AppBar position="static" style={{ bottom: 0 }} color="primary">
      <Toolbar>
        <Grid container direction="row" alignItems="center">
          <Grid item xs>
            <Typography variant="body1" color="inherit">
              @ Developed by Lam Dao
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >
              <Grid item>
                <Avatar style={{ backgroundColor: 'black' }}>
                  <GitHubIcon style={{ fill: 'white' }} />
                </Avatar>
              </Grid>
              <Grid item>
                <Avatar style={{ backgroundColor: 'pink' }}>
                  <InstagramIcon style={{ fill: 'white' }} />
                </Avatar>
              </Grid>
              <Grid item>
                <Avatar style={{ backgroundColor: 'blue' }}>
                  <FacebookIcon style={{ fill: 'white' }} />
                </Avatar>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <Grid container justify="flex-end">
              <Grid item>
                <Typography variant="body1" color="inherit">
                  Contact me at daoletunglam2002@gmail.com
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
