import React, { useContext, useState } from "react";
import Link from "next/link";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { AuthContext } from "../../contexts/AuthProvider";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "100%",
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMsg: {
    color: theme.palette.error.main,
  },
}));

const SignupForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const { signup } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup({ name, password, email, username });
  };

  const handleInputChange = (e, setter) => {
    e.preventDefault();
    setter(e.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            autoFocus
            value={username}
            onChange={(e) => handleInputChange(e, setUsername)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            autoFocus
            value={name}
            onChange={(e) => handleInputChange(e, setName)}
          />
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
                <a style={{ textDecoration: "none" }}>
                  {"Forgot your password ?"}
                </a>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/" variant="body2">
                <a style={{ textDecoration: "none" }}>
                  {"Don't have an account? Sign Up"}
                </a>
              </Link>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                <a style={{ textDecoration: "none" }}>
                  {"Sign in with Google ?"}
                </a>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/" variant="body2">
                <a style={{ textDecoration: "none" }}>
                  {"Sign in with Facebook"}
                </a>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignupForm;
