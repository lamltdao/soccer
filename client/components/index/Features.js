import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import FeatureCard from './FeatureCard';
import mapPic from '../../public/features-logo/map.png';
import trophyPic from '../../public/features-logo/trophy.png';
import footballPic from '../../public/features-logo/football.png';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.main,
  },
  root: {
    marginTop: theme.spacing(2),
  },
}));

const Features = (props) => {
  const classes = useStyles();
  const features = [
    {
      title: 'Soccer fields',
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry 's versions of Lorem Ipsum.",
      link: '/',
      imageSrc: mapPic,
    },
    {
      title: 'Leagues/Tournaments',
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry 's versions of Lorem Ipsum.",
      link: '/',
      imageSrc: trophyPic,
    },
    {
      title: 'Blogs',
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry 's versions of Lorem Ipsum.",
      link: '/',
      imageSrc: footballPic,
    },
  ];
  return (
    <>
      <Grid container justify='center' className={classes.root}>
        <Grid item>
          <Typography variant="h4" className={classes.title}>
            Features
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="row" justify='space-evenly' spacing={2} className={classes.root}>
        {features.map(({ title, description, link, imageSrc }) => (
          <Grid item>
            <FeatureCard
              title={title}
              description={description}
              link={link}
              imageSrc={imageSrc}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Features;
