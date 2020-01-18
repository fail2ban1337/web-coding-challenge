import React, { useState, useEffect, useCallback } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useUserStore } from "../../Context/appStore";
import { register } from "../../actions/userAction";
import { FormHelperText } from "@material-ui/core";
import Alert from "../inc/AlertComponents";
import { REMOVE_ERRORS, REMOVE_ALERT } from "../../actions/actionTypes";

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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "linear-gradient(45deg, #3f51b5 30%, #3f8cb5 90%)",

    "&:hover": {
      backgroundColor: "transparent",
      border: "1px solid #e74c3c"
    }
  },
  helperText: {
    color: "#F32013",
    fontWeight: "fontWeightBold"
  }
}));

function SignUp() {
  const classes = useStyles();
  const [{ auth, registerRdc, alert }, dispatch] = useUserStore();
  const [toLogin, setToHome] = useState(false);
  const stableDispatch = useCallback(dispatch, []);

  const [MyForm, setMyFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfPassword: false
  });

  const { email, password, confirmPassword } = MyForm;

  const submitForm = async form => {
    form.preventDefault();
    await register(email, password, confirmPassword, dispatch);
  };

  const handleClickShowPassword = () => {
    setMyFormData({ ...MyForm, showPassword: !MyForm.showPassword });
  };
  const handleClickShowConfPassword = () => {
    setMyFormData({ ...MyForm, showConfPassword: !MyForm.showConfPassword });
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const handleInputChange = event => {
    event.persist();
    dispatch({
      type: REMOVE_ERRORS
    });
    setMyFormData(MyForm => ({
      ...MyForm,
      [event.target.name]: event.target.value.trim()
    }));
  };
  const handlePasswordChange = event => {
    event.persist();
    setMyFormData(MyForm => ({
      ...MyForm,
      [event.target.name]: event.target.value
    }));
  };

  useEffect(() => {
    return () => {
      stableDispatch({
        type: REMOVE_ERRORS
      });
      stableDispatch({
        type: REMOVE_ALERT
      });
    };
  }, [stableDispatch]);
  if (registerRdc.success) {
    let time = setTimeout(() => test(time), 3000);
    dispatch({
      type: REMOVE_ERRORS
    });
  }
  const test = timer => {
    setToHome(true);
    clearTimeout(timer);
  };
  if (auth.isAuthenticated) {
    return <Redirect to="/shops" />;
  }
  return (
    <>
      {toLogin ? (
        <Redirect to="/" />
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            {alert.msg && <Alert message={alert.msg} type={alert.alertType} />}
            <Avatar className={classes.avatar}>
              <AccountCircle />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} onSubmit={form => submitForm(form)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={registerRdc.errors.email.msg ? true : false}
                    variant="outlined"
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleInputChange}
                    value={email}
                    inputProps={{ maxLength: 100 }}
                  />
                  {registerRdc.errors.email.msg && (
                    <FormHelperText className={classes.helperText}>
                      <sup>*</sup> {registerRdc.errors.email.msg}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={registerRdc.errors.password.msg ? true : false}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={MyForm.showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    onChange={handlePasswordChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {MyForm.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  {registerRdc.errors.password.msg && (
                    <FormHelperText className={classes.helperText}>
                      <sup>*</sup> {registerRdc.errors.password.msg}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={
                      registerRdc.errors.confirmPassword.msg ? true : false
                    }
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm  Password"
                    autoComplete="new-password"
                    type={MyForm.showConfPassword ? "text" : "password"}
                    onChange={handlePasswordChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {MyForm.showConfPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  {registerRdc.errors.confirmPassword.msg && (
                    <FormHelperText className={classes.helperText}>
                      <sup>*</sup> {registerRdc.errors.confirmPassword.msg}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="center">
                <Grid item>
                  <Link to="/">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      )}
    </>
  );
}
const Register = () => {
  return (
    <div style={{ flex: 1 }}>
      <SignUp />
    </div>
  );
};

export default Register;
