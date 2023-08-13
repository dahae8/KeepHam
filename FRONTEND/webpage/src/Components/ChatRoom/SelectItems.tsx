import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';

type propsType = {
  name: string;
  price: number;
  image: string;
  allow:boolean;
  key:number;
};

function SelectItems(props: propsType) {
  const [count, setCount] = React.useState(0);
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
        <Button onClick={()=>{
          if(props.allow){  
            setCount(count+1);
          }
        }}>+</Button>
        <Typography
          sx={{ display: "inline" }}
          component="span"
          variant="h6"
          color="text.primary"
        >
          {count}
        </Typography>
        <Button onClick={()=>{
          if(count>0&&props.allow){
            setCount(count-1);
          }
        }}>-</Button>
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}

export default SelectItems;
