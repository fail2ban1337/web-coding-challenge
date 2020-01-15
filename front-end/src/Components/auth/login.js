import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
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
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
    }
}));

const SignIn = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false
    });
    const { email, password, remember } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value.trim() });

    const submitForm = async form => {
        form.preventDefault();

    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
        </Typography>
                <form className={classes.form} onSubmit={form => submitForm(form)}>
                    <TextField
                        variant="standard"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address or Username"
                        name="email"
                        autoComplete="email"
                        type="text"
                        value={email || ""}
                        onChange={e => onChange(e)}
                        autoFocus
                    />

                    <TextField
                        variant="standard"
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

                    <FormControlLabel
                        control={
                            <Checkbox
                                value={remember || false}
                                color="primary"
                                checked={remember || false}
                                name="remember"
                                onChange={e =>
                                    setFormData({
                                        ...formData,
                                        [e.target.name]: e.target.checked
                                    })
                                }
                            />
                        }
                        label="Remember me"
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
                    <Grid container>
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