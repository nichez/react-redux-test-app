import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import * as actions from "../store/actions/authActions";

const checkValidity = (value: string, type: string) => {
  let isValid = true;

  if (value.length < 1) {
    isValid = value.trim() !== "" && isValid;
  }

  if (type === 'email') {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  console.log("isValid", isValid);

  return isValid;
};

const Auth: React.FC<any> = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSignup, setIsSignup] = useState<boolean>(false);

  const emailChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    checkValidity(event.currentTarget.value, 'email')
    setEmail(event.currentTarget.value);
  };

  const passwordChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    checkValidity(event.currentTarget.value, 'password')
    setPassword(event.currentTarget.value);
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
    console.log(email, password, isSignup)
    props.onAuth(email, password, isSignup);
  };

  const handleCloseSnackbar = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    return false;
  };

  console.log('this error props', props.error === "")

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.container}>
          <Typography component="h1" variant="h5">
            {!isSignup ? 'Sign In' : 'Sign Up'}
          </Typography>
          <form className={classes.form} onSubmit={submitHandler}>
            <TextField
              margin="normal"
              type="email"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={emailChangeHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={passwordChangeHandler}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {!isSignup ? 'Sign In' : 'Sign Up'}
            </Button>
            <Button
              type="button"
              color="primary"
              className={classes.submit}
              onClick={() => setIsSignup(prevState => !prevState)}
            >
              Switch to {isSignup ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>
        </div>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={props.error !== ""}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={props.error}
      />
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(#fff8e5, #fff)",
  },
  container: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const mapStateToProps = (state: any) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== "",
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAuth: (email: string, password: string, isSignup: boolean) =>
      dispatch(actions.auth(email, password, isSignup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
