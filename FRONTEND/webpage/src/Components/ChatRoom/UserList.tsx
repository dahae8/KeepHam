import { Box } from "@mui/material"
import Item from "./User/Item"
import axios from "axios";
import { useEffect, useState } from "react";


interface MyComponentProps {
  roomId: number;
  // 다른 프로퍼티들도 정의할 수 있습니다.
}

const UserList: React.FC<MyComponentProps> = (props) => {
  console.log("방번호",props.roomId)

  const [users,setUsers] = useState([])

  // const users = ['사용자1', '사용자2', '사용자3']

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const url = import.meta.env.VITE_URL_ADDRESS + "/api/rooms/"+props.roomId+"/users";
        const response = await axios.get(url);
        // console.log("결과:", response.data.body);
  
        // console.log("결과2:",response);
        setUsers(response.data.body);
  
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    console.log('users', users)
  
  }, []);

  return (
    <Box sx={{
      padding: 2,
      boxShadow: 4,
      width: "100%",
      height: "100%",
    }}>
      {users.map((item, index) => (
        <Item
          key={index}
          id={index}
          name={item}
          roomId={props.roomId}
        />
      ))}  
    </Box>
  )
}

export default UserList