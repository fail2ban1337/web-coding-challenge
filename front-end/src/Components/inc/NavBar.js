import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import Button from "@material-ui/core/Button";
import { Container, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useUserStore } from "../../Context/appStore";
import { logout } from "../../actions/userAction";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  }
}));

const NavBtn = ({ text, link }) => (
  <Link to={link} style={{ color: "white", textDecoration: "none" }}>
    <Button color="inherit">{text}</Button>
  </Link>
);

function NavBar() {
  const [state, dispatch] = useUserStore();
  const classes = useStyles();

  const handleLogout = () => {
    logout(dispatch);
  };
  const authLinks = (
    <>
      <Link to={`/favShops`} style={{ color: "white", textDecoration: "none" }}>
        <MenuItem>
          Favorite <FavoriteIcon />
        </MenuItem>
      </Link>

      <MenuItem onClick={handleLogout}>
        Logout <ExitToAppIcon />
      </MenuItem>
    </>
  );
  const guestLink = (
    <>
      <NavBtn text="Login" link="/" />
      <NavBtn text="register" link="/register" />
    </>
  );
  const { loading, isAuthenticated } = state.auth;
  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        style={{
          background: "linear-gradient(45deg, #3f51b5 30%, #3f8cb5 90%)"
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            <Link
              to={`/shops`}
              style={{ color: "white", textDecoration: "none" }}
            >
              <Typography variant="h6" noWrap>
                Shop <ShoppingBasketIcon />
              </Typography>
            </Link>
            <div className={classes.grow} />

            {!loading && <>{isAuthenticated ? authLinks : guestLink}</>}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default NavBar;
