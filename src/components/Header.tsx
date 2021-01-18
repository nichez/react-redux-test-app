import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import * as actions from "../store/actions/authActions";

const Header: React.FC<any> = (props) => {
  const classes = useStyles();
  const { onLogout, email } = props;
  const [anchorEl, open] = useState<null | HTMLElement>(null);
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    open(event.currentTarget);
  };

  const handleClose = () => {
    open(null);
    onLogout();
  };

  return (
    <AppBar position="fixed" className={classes.appBar} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" noWrap className={classes.title}>
          Dashboard
        </Typography>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {email}
        </Button>

        <Menu
          id="Menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    display: "flex",
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#fff",
  },
  title: {
    color: "black",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: localStorage.getItem('token') !== "",
    email: localStorage.getItem('email')
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
