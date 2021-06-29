import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 330,
  },
  cardLogoBg: {
    backgroundColor: theme.palette.success.main,
  },
  cardContent: {
    backgroundColor: theme.palette.primary.main,
  },
  featureLink: {
    color: theme.palette.success.main,
  },
}));

const FeatureCard = ({ title, description, link, imageSrc }) => {
  const classes = useStyles();
  const ImageComponent = () => (
    <Image src={imageSrc} alt="Logo" height="400px" />
  );
  return (
    <Card
      className={classes.root}
    >
      <div className={classes.cardLogoBg}>
        <ImageComponent />
      </div>
      <CardContent className={classes.cardContent}>
        <Grid container direction="column" justify="space-evenly">
          <Grid item>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              color="secondary"
            >
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="secondary" component="p">
              {description}
            </Typography>
          </Grid>
          <Grid item>
            <Link href={link}>
              <a style={{ textDecoration: 'none' }}>
                <Typography className={classes.featureLink}>Explore</Typography>
              </a>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  imageSrc: PropTypes.object.isRequired,
};

export default FeatureCard;
