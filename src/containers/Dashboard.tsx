import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import * as actions from "../store/actions/dashboardActions";
import UserItem from "../components/UserItem";

const Dashboard: React.FC<any> = (props) => {
  const classes = useStyles();
  const { onFetchUsers, users } = props;
  let fetchedUsers: any[] = [];

  useEffect(() => {
    onFetchUsers();
  }, []);

  if (users.length > 0) {
    fetchedUsers = users.map((item: any) => {
      return (
        <Grid item sm={12} md={3} key={item.id}>
          <UserItem user={item} />
        </Grid>
      );
    });
  }

  const FormRow = () => {
    return (
      <React.Fragment>
        <Grid container>{fetchedUsers}</Grid>
      </React.Fragment>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.appBar}>
        <Typography variant="h6" noWrap className={classes.title}>
          Secret Dashboard
        </Typography>
      </div>
      <div className={classes.content}>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>
            <FormRow />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  appBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 130,
    width: "100%",
    backgroundColor: "#fce094",
  },
  title: {
    color: "black",
    marginTop: 40,
    marginLeft: 20,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    display: "flex",
    marginTop: 20
  },
}));

const mapStateToProps = (state: any) => {
  return {
    users: state.dashboard.users,
    loading: state.dashboard.loading,
    error: state.dashboard.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchUsers: () => dispatch(actions.fetchDashboard()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
