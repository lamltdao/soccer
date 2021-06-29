import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Grid, Typography, Button, makeStyles, Box } from '@material-ui/core';
import { SCHEDULE_STATUS } from '../../constants';

const useStyles = makeStyles((theme) => ({
  scheduleBox: {
    minHeight: 120,
    marginTop: theme.spacing(2),
  },
}));

// REQUIRES: starts and ends on the same day (No soccerfield opens overnight, tho)
const formatDate = (dateStartStr, dateEndStr) => {
  const dateStart = new Date(dateStartStr);
  const dateEnd = new Date(dateEndStr);

  const date = dateStart.getDate();
  const hourStart = dateStart.getHours();
  const minuteStart = dateStart.getMinutes();

  const hourEnd = dateEnd.getHours();
  const minuteEnd = dateEnd.getMinutes();

  return `${date} ${hourStart}:${minuteStart}-${hourEnd}:${minuteEnd}`;
};
const Schedules = ({ schedules, soccerFieldId }) => {
  const router = useRouter();
  const classes = useStyles();
  const renderSchedules = (schedulesList) => {
    return (
      <Grid container direction="column">
        {schedulesList.map((schedule, idx) => {
          const { time, teams, status } = schedule;
          return (
            <Grid item key={idx}>
              <Box
                border={1}
                borderColor="primary.main"
                className={classes.scheduleBox}
                borderRadius={15}
              >
                <Grid container direction="row" spacing={2}>
                  <Grid item>
                    {formatDate(time[0], time[1])}
                  </Grid>
                  <Grid item>
                    {
                      status === 'Full'
                      ? (
                        <Typography>
                          {teams[0].name}
                      VS
                      {teams[1].name}
                        </Typography>
                      )
                      : (
                        <Typography>
                          {teams[0].name} is looking for an opponent
                        </Typography>
                      )
                    }
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    );
  };
  return (
    <>
      {/** Titles and new schedule button */}
      <Grid container direction="row">
        <Grid item xs={6}>
          <Grid container justify="flex-start">
            {/** Filter by date */}
            <Typography variant="h5">All Schedules</Typography>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container justify="flex-end">
            <Grid item>
              <Button
                variant="outlined"
                onClick={() =>
                  router.push(`/soccer-fields/${soccerFieldId}/new`)
                }
              >
                <Typography variant="h5">Set new schedule</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/** Render schedules */}
      {renderSchedules(schedules)}
    </>
  );
};

Schedules.propTypes = {
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.arrayOf(PropTypes.string),
      teams: PropTypes.arrayOf(
        PropTypes.shape({
          userId: PropTypes.string,
          name: PropTypes.string,
        })
      ),
      status: PropTypes.oneOf([SCHEDULE_STATUS.Full, SCHEDULE_STATUS.Vacant]),
    })
  ).isRequired,
  soccerFieldId: PropTypes.string.isRequired,
};

export default Schedules;
