import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import * as actions from "../store/actions/settingsActions";
import SettingsItem from "../components/SettingsItem";

const Settings: React.FC<any> = (props) => {
  const classes = useStyles();
  const { onFetchPhotos, photos } = props;
  let fetchedPhotos: any[] = [];

  useEffect(() => {
    onFetchPhotos();
  }, []);

  if (photos.length > 0) {
    fetchedPhotos = photos.map((item: any) => {
      return (
        <Grid item sm={12} md={3} key={item.id}>
          <SettingsItem photo={item} />
        </Grid>
      );
    });
  }

  const FormRow = () => {
    return (
      <React.Fragment>
        <Grid container>{fetchedPhotos}</Grid>
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
    photos: state.settings.photos,
    loading: state.settings.loading,
    error: state.settings.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchPhotos: () => dispatch(actions.fetchSettings()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
