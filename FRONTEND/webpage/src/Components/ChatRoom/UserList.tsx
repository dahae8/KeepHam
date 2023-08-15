import { Box } from "@mui/material"
import Item from "./User/Item"
import axios from "axios";
import { useEffect, useState } from "react";


interface MyComponentProps {
  roomId: number;
  boxId: number;
  // 다른 프로퍼티들도 정의할 수 있습니다.
}

const UserList: React.FC<MyComponentProps> = (props) => {
  console.log("방번호",props.roomId)
  // const [userNick, setUserNick] = useState(sessionStorage.getItem("userNick"));
  const [superNick, setSuperNick] = useState(sessionStorage.getItem("superUser"));
  const userNick = sessionStorage.getItem("userNick");
  // const superNick = sessionStorage.getItem("superUser");

  // console.log('userNick:',userNick)
  // console.log('superNick:',superNick)

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
        // sessionStorage.setItem("superUser", )
  
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    console.log('users', users)
  
  }, []);

  useEffect(() => {

    const fetchSuperUser = async () => {
      try {
        const url = import.meta.env.VITE_URL_ADDRESS + "/api/rooms/"+props.boxId+"?status=OPEN&page=1&pageSize=1";
        const response = await axios.get(url);
        // console.log("결과:", response.data.body[0].super_user_id);
  
        // console.log("결과2:",response);
        setSuperNick(response.data.body[0].super_user_id);
        // sessionStorage.setItem("superUser", )
  
      } catch (error) {
        console.log(error);
      }
    };
    fetchSuperUser();
    console.log('SuperNick', superNick)
  
  }, [superNick]);

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
          userNick = {userNick}
          superNick = {superNick}
        />
      ))}  
    </Box>
  )
}

export default UserList