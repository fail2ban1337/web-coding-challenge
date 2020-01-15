import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core'
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        color: "#fff",
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            overflow: 'visible'
        },
    },
}));

const NavBtn = ({ text, link }) => (
    <Link to={link} style={{ color: "white", textDecoration: "none" }}>
        <Button color="inherit">{text}</Button>
    </Link>
);

function NavBar() {
    const classes = useStyles();
    return (
        <div className={classes.grow}>
            <AppBar position="static" style={{ background: 'linear-gradient(45deg, #3f51b5 30%, #3f8cb5 90%)' }}>
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Shop <ShoppingBasketIcon />
                        </Typography>

                        <div className={classes.grow} />

                        <NavBtn text="Login" link="/login" />
                    </Toolbar></Container>
            </AppBar>
        </div>
    );
}
export default NavBar;
