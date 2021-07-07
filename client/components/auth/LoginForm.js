import React, { useState } from 'react';
import Link from 'next/link';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useRequest from '../../hooks/use-request';
import { useRouter } from 'next/router';
import { List, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: '100%',
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMsg: {
    color: theme.palette.error.main,
  }
}));

const LoginForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: '/api/auth/login',
    body: {
      email,
      password,
    },
    method: 'post',
    onSuccess: () => router.push('/'),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  const handleInputChange = (e, setter) => {
    e.preventDefault();
    setter(e.target.value);
  }

  const renderErrors = (errs) => {
    if(Array.isArray(errs)) {
      return (
        <List>
          {errs.map((err) => (
            <ListItemText primary={err} className={classes.errorMsg} />
          ))}
        </List>
      )
    }
    return (
      <List>
        <ListItemText primary={errs} className={classes.errorMsg} />
      </List>
    )
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          LOGIN
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => handleInputChange(e, setEmail)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => handleInputChange(e, setPassword)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {renderErrors(errors)}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                <a style={{ textDecoration: 'none' }}>
                  {'Forgot your password ?'}
                </a>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/" variant="body2">
                <a style={{ textDecoration: 'none' }}>
                  {"Don't have an account? Sign Up"}
                </a>
              </Link>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                <a style={{ textDecoration: 'none' }}>
                  {'Sign in with Google ?'}
                </a>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/" variant="body2">
                <a style={{ textDecoration: 'none' }}>
                  {'Sign in with Facebook'}
                </a>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;
