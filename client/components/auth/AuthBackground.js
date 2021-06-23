import React, { useEffect, useRef, useState } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';
import { makeStyles } from '@material-ui/core';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  main: {
    height: '75vh',
  },
}));
const AuthBackground = () => {
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
    <div
      ref={vantaRef}
      className={classes.main}
    >
    </div>
  );
};

export default AuthBackground;
