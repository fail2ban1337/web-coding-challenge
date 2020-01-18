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
import { useUserStore } from "../../Context/appStore";
import Alert from "../inc/AlertComponents";
import Box from "@material-ui/core/Box";
import { blue } from "@material-ui/core/colors";
import StorefrontIcon from "@material-ui/icons/Storefront";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { getShops, likeShop, dislikeShop } from "../../actions/shopAction";
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
  shopName: {
    position: "absolute",
    bottom: "0",
    left: "0",
    textAlign: "center",
    width: "100%",
    color: "white",
    background: "url(../img/mask-title.png) top repeat-x"
  },
  imgBox: {
    position: "relative",
    overflow: "hidden"
  },
  quality: {
    position: "absolute",
    top: "8px",
    right: "8px",
    background: "#fed700",
    borderRadius: "3px",
    color: "#222",
    fontSize: "11px",
    fontWeight: "500",
    height: "auto",
    padding: "4px 6px"
  },
  shops: {
    maxWidth: "100%",
    marginBottom: "50px",
    transition: "transform 2s"
  },
  image: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
      overflow: "visible"
    }
  },
  details: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
    background: "rgba(59,71,99,.9)",
    textAlign: "center",
    transition: "0.5s",
    cursor: "pointer",
    opacity: "0",
    "&:hover": {
      opacity: "1",
      transform: "scale(1.6)"
    }
  }
}));

const ShopContainer = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent={"center"}
        className={classes.imgBox}
      >
        {children}
      </Box>
    </>
  );
};

function Shop() {
  const classes = useStyles();
  const [{ shopsRdc }, dispatch] = useUserStore();
  const stableDispatch = useCallback(dispatch, []);

  const OnLike = id => {
    async function LShop() {
      await likeShop(id, dispatch);
      await getShops(stableDispatch);
    }
    LShop();
  };

  const OnDislike = id => {
    async function DShop() {
      await dislikeShop(id, dispatch);
      await getShops(stableDispatch);
    }
    DShop();
  };

  useEffect(() => {
    async function gShops() {
      await getShops(stableDispatch);
    }
    gShops();
  }, [stableDispatch]);

  useEffect(() => {
    return () => {
      stableDispatch({
        type: REMOVE_ALERT
      });
    };
  }, [stableDispatch]);
  return (
    <>
      {shopsRdc.result.map(value => {
        return (
          <Box
            key={value.id}
            maxWidth={200}
            maxHeight={280}
            style={{ margin: "2% 4%" }}
            flexGrow={1}
            className={classes.imgBox}
          >
            <img
              className={classes.shops}
              src={value.Shop_cover_image}
              alt="Smiley face"
              style={{ height: "280px", width: "100%" }}
            />

            <div className={classes.details}>
              <ButtonGroup
                variant="contained"
                orientation="vertical"
                color="primary"
                aria-label="vertical outlined primary button group"
                style={{
                  position: "relative",
                  top: "50%",
                  transform: "translateY(-50%)"
                }}
              >
                <Button onClick={() => OnLike(value.id)}>
                  <ThumbUpAltIcon />
                </Button>
                <Button color="secondary" onClick={() => OnDislike(value.id)}>
                  <ThumbDownIcon />
                </Button>
              </ButtonGroup>
            </div>

            <span className={classes.shopName}>
              <h4>{value.shop_name}</h4>
            </span>
            <span className={classes.quality}>{value.destination}km</span>
          </Box>
        );
      })}
    </>
  );
}

const Introduction = () => {
  const classes = useStyles();
  const [state, dispatch] = useUserStore();

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        {state.alert.msg && (
          <Alert message={state.alert.msg} type={state.alert.alertType} />
        )}
        <Avatar className={classes.avatar}>
          <StorefrontIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Shops
        </Typography>
      </div>
    </Container>
  );
};

const Shops = () => {
  return (
    <div style={{ flex: 1 }}>
      <Introduction />
      <ShopContainer>
        <Shop />
      </ShopContainer>
    </div>
  );
};

export default Shops;
