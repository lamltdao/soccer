import React, { useEffect, useRef, useState } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';
import { makeStyles } from '@material-ui/core';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  main: {
    height: '75vh',
  },
  description: {
    color: theme.palette.primary.contrastText,
    marginLeft: theme.spacing(10),
  },
  descriptionBlock: {},
}));
const Description = () => {
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE,
          color: 'green',
          backgroundColor: 'black',
          maxDistance: 34.0,
        })
      );
    }
  }, [vantaEffect]);

  const classes = useStyles();
  return (
    <Grid
      container
      justify="flex-start"
      alignItems="center"
      ref={vantaRef}
      className={classes.main}
    >
      <Grid item>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography variant="h2" className={classes.description}>
              Welcome to Soccer !
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" className={classes.description}>
              Join our community of soccer lover
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Description;
