import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

type propsType = {
  name: string;
  price: number;
  image: string;
  allow: boolean;
  key: number;
  count: number;
  setcount: () => void;
};

function SelectItems(props: propsType) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start" key={props.key}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={props.image} />
        </ListItemAvatar>
        <ListItemText
          primary={props.name}
          secondary={
            <React.Fragment>
              {props.price}
              {"원"}
            </React.Fragment>
          }
        />
        <Button
          onClick={() => {
            if (props.allow) {
              console.log("ddd");
            }
          }}
        >
          +
        </Button>
        <Typography
          sx={{ display: "inline" }}
          component="span"
          variant="h6"
          color="text.primary"
        >
          {props.count}
        </Typography>
        <Button
          onClick={() => {
            if (props.count > 0 && props.allow) {
              console.log("ddd");
            }
          }}
        >
          -
        </Button>
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}

export default SelectItems;
