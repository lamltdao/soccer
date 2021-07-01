import React from 'react';
import { Grid, makeStyles, Typography, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    submitBtn: {
        backgroundColor: theme.palette.error.main,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        }
    }
}))

const NewScheduleForm = () => {
    const classes = useStyles();
    return (
        <Grid container direction="column" className={classes.root} spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4" style={{textAlign: 'center'}}>
                    Set up new schedule
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container direction="row" alignItems="center">
                    <Grid item xs={3}>
                        <Typography variant="h6" style={{textAlign: 'center'}}>
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
                            label="Soccer Field"
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container direction="row" alignItems="center">
                    <Grid item xs={3}>
                        <Typography variant="h6" style={{textAlign: 'center'}}>
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
                        <Typography variant="h6" style={{textAlign: 'center'}}>
                            Time
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container direction="row" alignItems="center" spacing={5}>
                            <Grid item xs={4}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="from"
                                    label="From"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="to"
                                    label="To"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>
                                    Valid
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container direction="row" alignItems="center">
                    <Grid item xs={3}>
                        <Typography variant="h6" style={{textAlign: 'center'}}>
                            Already have an opponent ?
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            name="hasOpponent"
                            label="No"
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justify="center">
                <Grid item>
                    <Button variant="outlined" className={classes.submitBtn}>
                        <Typography color="secondary">
                            Submit
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default NewScheduleForm;