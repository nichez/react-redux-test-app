import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const UserItem: React.FC<any> = (props) => {
  const classes = useStyles();
  const { user } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {user.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            E-mail: {user.email}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Phone: {user.phone}
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

export default UserItem;
