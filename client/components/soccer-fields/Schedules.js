import React from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Grid, Typography, Button, makeStyles, Box } from "@material-ui/core";
import { SCHEDULE_STATUS } from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  scheduleBox: {
    minHeight: 120,
    marginTop: theme.spacing(2),
  },
  scheduleGrid: {
    minHeight: 120,
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
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  className={classes.scheduleGrid}
                >
                  <Grid item xs={4}>
                    <Typography variant="h5">
                      {formatDate(time[0], time[1])}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {status === "Full" ? (
                      <Grid container justify="space-evenly">
                        <Grid item xs={4}>
                          <Grid container justify="flex-start">
                            <Typography variant="h5">
                              {teams[0].name}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <Grid container justify="center">
                            <Typography variant="h5">VS</Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <Grid container justify="flex-end">
                            <Typography variant="h5">
                              {teams[1].name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    ) : (
                      <Typography variant="h5">
                        {teams[0].name} is looking for an opponent
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    );
  };
  return (
    <div className={classes.root}>
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
    </div>
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
