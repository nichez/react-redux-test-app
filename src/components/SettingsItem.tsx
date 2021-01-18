import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const SettingsItem: React.FC<any> = (props) => {
  const classes = useStyles();
  const { photo } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={photo.url}
          title={"foodItem.strCategory"}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {photo.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: 20,
  },
  media: {
    height: 140,
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "space-between",
    padding: 10,
  },
}));

export default SettingsItem;
