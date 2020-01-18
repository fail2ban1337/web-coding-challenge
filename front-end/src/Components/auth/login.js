import React, { useState, useEffect, useCallback } from "react";
import { Link, Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { login } from "../../actions/userAction";
import { useUserStore } from "../../Context/appStore";
import Alert from "../inc/AlertComponents";
import { REMOVE_ALERT } from "../../actions/actionTypes";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    background: "linear-gradient(45deg, #3f51b5 30%, #3f8cb5 90%)"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "linear-gradient(45deg, #3f51b5 30%, #3f8cb5 90%)"
  }
}));

const SignIn = () => {
  const classes = useStyles();
  const [state, dispatch] = useUserStore();
  const stableDispatch = useCallback(dispatch, []);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });

  const submitForm = async form => {
    form.preventDefault();
    login(email, password, dispatch);
  };

  useEffect(() => {
    return () => {
      stableDispatch({
        type: REMOVE_ALERT
      });
    };
  }, [stableDispatch]);

  if (state.auth.isAuthenticated) {
    return <Redirect to="/shops" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {state.alert.msg && (
          <Alert message={state.alert.msg} type={state.alert.alertType} />
        )}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={form => submitForm(form)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="text"
            value={email || ""}
            onChange={e => onChange(e)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password || ""}
            onChange={e => onChange(e)}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link to="/register">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const Login = () => {
  return (
    <div style={{ flex: 1 }}>
      <SignIn />
    </div>
  );
};

export default Login;
