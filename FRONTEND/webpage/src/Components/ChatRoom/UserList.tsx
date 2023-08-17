import { Box } from "@mui/material";
import Item from "@/Components/ChatRoom/User/Item.tsx";
import axios from "axios";
import { useEffect, useState } from "react";

interface MyComponentProps {
  roomId: number;
  boxId: number;
  userSet: Set<string>
  
  // 다른 프로퍼티들도 정의할 수 있습니다.
}

const UserList: React.FC<MyComponentProps> = (props) => {
  const [superNick, setSuperNick] = useState(
    sessionStorage.getItem("superUser")
  );
  const userNick = sessionStorage.getItem("userNick");


  const [users, setUsers] = useState([]);


  const [reload, setReload] = useState(false);


  const reloadUsers = () => {
    console.log("change reload");
    console.log(reload);

    setReload(!reload);
    console.log(reload);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const url =
          import.meta.env.VITE_URL_ADDRESS +
          "/api/rooms/" +
          props.roomId +
          "/users";
        const response = await axios.get(url);

        setUsers(response.data.body);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
    
  }, [reload, props.roomId, props.userSet]);


  useEffect(() => {
    const fetchSuperUser = async () => {
      try {
        const url =
          import.meta.env.VITE_URL_ADDRESS +
          "/api/rooms/" +
          props.roomId +
          "?status=OPEN&page=1&pageSize=1";
        const response = await axios.get(url);

        setSuperNick(response.data.body[0].super_user_id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSuperUser();
    console.log("SuperNick", superNick);
  }, [reload]);

  return (
    <Box
      sx={{
        padding: 2,
        boxShadow: 4,
        width: "100%",
        height: "100%",
      }}
    >
      {users.map((item, index) => (
        <Item
          key={index}
          id={index}
          name={item}
          roomId={props.roomId}
          userNick={userNick}
          superNick={superNick}
          reloadUsers={reloadUsers}
        />
      ))}
    </Box>
  );
};

export default UserList;
