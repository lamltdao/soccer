import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, makeStyles } from "@material-ui/core";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";
import { Typography } from "@material-ui/core";
import BackButton from "../common/BackButton";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 400,
  },
}));

const SoccerFieldDescription = ({ description, soccerFieldId }) => {
  const { name, address } = description;
  const { email, phoneNumber } = description.contact;
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE,
          color: "green",
          backgroundColor: "black",
          maxDistance: 34.0,
        })
      );
    }
  }, [vantaEffect]);

  const classes = useStyles();
  const router = useRouter();
  return (
    <Grid container className={classes.root} ref={vantaRef}>
      <Grid item xs={12}>
        <BackButton onClick={() => router.push("/soccer-fields")} />
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h3"
          color={vantaEffect ? "secondary" : "primary"}
          style={{ textAlign: "center" }}
        >
          {name}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="row">
          <Grid item xs={9}>
            <Grid container alignItems="flex-start">
              <Grid item>
                <Typography
                  variant="h5"
                  color={vantaEffect ? "secondary" : "primary"}
                >
                  Address:&nbsp;{address}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container alignItems="flex-start" direction="column">
              <Grid item>
                <Typography
                  variant="h5"
                  color={vantaEffect ? "secondary" : "primary"}
                >
                  Contact:&nbsp;{email}
                </Typography>
                <Typography
                  variant="h5"
                  color={vantaEffect ? "secondary" : "primary"}
                >
                  {phoneNumber}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

SoccerFieldDescription.propTypes = {
  description: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    contact: PropTypes.shape({
      email: PropTypes.string,
      phoneNumber: PropTypes.string,
    }),
  }).isRequired,
  soccerFieldId: PropTypes.string.isRequired,
};

export default SoccerFieldDescription;
