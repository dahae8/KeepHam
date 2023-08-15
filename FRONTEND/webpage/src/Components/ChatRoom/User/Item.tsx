import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';


interface ItemProps {
  id: number;
  name: string;
  roomId:number;
}

const Item: React.FC<ItemProps> = (props) => {
  // let itemStyleByAmountType = "item " + props.amountType;
  // let fontStyleByAmountType = "fs-emphasis fc-red";

  const itemTitle = props.name;
  // let itemAmount = "-" + addComma(props.amount.toString());

  // if (props.amountType === "충전") {
  //   fontStyleByAmountType = fontStyleByAmountType.replace("red", "green");
  //   itemAmount = itemAmount.replace("-", "+");
  // }

  return (
    <div>
            <List>
                
                <ListItem
                  secondaryAction={
                    // <IconButton edge="end" aria-label="delete">
                    //   <DeleteIcon />
                    // </IconButton>
                    <div>
                      <Button variant="contained"><Typography>추방</Typography></Button>
                      <Button variant="outlined"><Typography>위임</Typography></Button>
                    </div>
                  }
                >
                  <ListItemText
                    primary={itemTitle}
                  />
                </ListItem>
                <Divider />
            </List>
    </div>
  );
};

export default Item;