import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import axios from 'axios';


interface ItemProps {
  id: number;
  name: string;
  roomId:number;
  userNick:string|null;
  superNick:string|null;
}

const Item: React.FC<ItemProps> = (props) => {
  // let itemStyleByAmountType = "item " + props.amountType;
  // let fontStyleByAmountType = "fs-emphasis fc-red";

  console.log("item에서 찍히는 userNick:", props.userNick)
  console.log("item에서 찍히는 superNick:", props.superNick)

  const roomId = props.roomId;
  const itemTitle = props.name;
  const userNick = props.userNick;
  const superNick = props.superNick;
  const AccessToken = sessionStorage.getItem("AccessToken")
  // let itemAmount = "-" + addComma(props.amount.toString());

  // if (props.amountType === "충전") {
  //   fontStyleByAmountType = fontStyleByAmountType.replace("red", "green");
  //   itemAmount = itemAmount.replace("-", "+");
  // }

  const exitUser = async () => {
    console.log("Access Token",AccessToken)
    try {
      const url = import.meta.env.VITE_URL_ADDRESS + "/api/rooms/kick";
      const response = await axios.put(url,
        {
          "kicked_user_nick_name": itemTitle,
          "room_id": roomId
        },
        {
          headers:
          {
            Authorization: `Bearer ` + AccessToken
          }
        })
      console.log(response.data.body);

      console.log(response);

    } catch (error) {
      console.log(error);
    }
  };

  const transSuper = async () => {
    try {
      const url = import.meta.env.VITE_URL_ADDRESS + "/api/rooms/superUser";
      const response = await axios.put(url,
        {
          "room_id": roomId,
          "new_super_user": itemTitle
        },
        {
          headers:
          {
            Authorization: `Bearer ` + AccessToken
          }
        })
      console.log(response.data.body);

      console.log(response);

    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>
            <List>
              {userNick === superNick && itemTitle !== superNick ? 
                <ListItem
                  secondaryAction={
                    <div>
                      <Button variant="contained" onClick={()=> {exitUser()}}><Typography>추방</Typography></Button>
                      <Button variant="outlined" onClick ={()=> {transSuper()}}><Typography>위임</Typography></Button>
                    </div> 
                  }
                >
                  <ListItemText
                    primary={itemTitle}
                  />
                  </ListItem>
                :
                <ListItem>
                  <ListItemText primary={itemTitle} />
                </ListItem>                
              }
              <Divider /> 
            </List>
    </div>
  );
};

export default Item;