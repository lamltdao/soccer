import React from "react";
import {
  Grid,
  makeStyles,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";
import { HAS_OPPONENT_STATUS } from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  submitBtn: {
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const NewScheduleForm = () => {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h4" style={{ textAlign: "center" }}>
          Set up new schedule
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={3}>
            <Typography variant="h6" style={{ textAlign: "center" }}>
              Soccer field
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="soccerfield"
              value="Soccer Field"
              disabled
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={3}>
            <Typography variant="h6" style={{ textAlign: "center" }}>
              Team name
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="soccerfield"
              label="Team name"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={3}>
            <Typography variant="h6" style={{ textAlign: "center" }}>
              Date
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              type="date"
              variant="outlined"
              margin="normal"
              required
              name="date"
              defaultValue="2021-07-21"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={3}>
            <Typography variant="h6" style={{ textAlign: "center" }}>
              Time
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Grid container direction="row" alignItems="center" spacing={5}>
              <Grid item xs={4}>
                <TextField
                  type="time"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="from"
                  label="From"
                  defaultValue="07:30"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="time"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="to"
                  label="To"
                  defaultValue="07:30"
                />
              </Grid>
              <Grid item xs={4}>
                <Typography>Valid</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={3}>
            <Typography variant="h6" style={{ textAlign: "center" }}>
              Already have an opponent ?
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              name="hasOpponent"
              select
              // SelectProps={{
              //   MenuProps: {
              //     PaperProps: {
              //       className: classes.selectStatusMenu,
              //     }
              //   }
              // }}
            >
              <MenuItem value={HAS_OPPONENT_STATUS.Yes}>
                <Typography>Yes</Typography>
              </MenuItem>
              <MenuItem value={HAS_OPPONENT_STATUS.No}>
                <Typography>No</Typography>
              </MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item>
          <Button variant="outlined" className={classes.submitBtn}>
            <Typography color="secondary">Checkout</Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewScheduleForm;
