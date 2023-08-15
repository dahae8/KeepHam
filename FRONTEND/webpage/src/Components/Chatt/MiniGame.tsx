import * as React from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import axios from 'axios';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface MyComponentProps {
  roomId: number;
  // 다른 프로퍼티들도 정의할 수 있습니다.
}

const MiniGame: React.FC<MyComponentProps> = (props) => {
  console.log('방번호2',props.roomId)

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
    // console.log('users', users)
  
  }, []);


  const getRandomIndex = function(length:number){
    return parseInt((Math.random() * length).toString())
  }

  return (
    <div>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            #추첨게임
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {users[getRandomIndex(users.length)]} 님이 당첨입니다!
          </Typography>
        </Box>
    </div>
  );
};

export default MiniGame;

// export default function MiniGame() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const users = ['사용자1', '사용자2', '사용자3']

//   const getRandomIndex = function(length:number){
//     return parseInt((Math.random() * length).toString())
//   }

//   return (
//     <div>
//       <Button onClick={handleOpen}>실행</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             #사다리게임
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//           {users[getRandomIndex(users.length)]} 님이 당첨입니다!
//           </Typography>
//           <Button onClick={handleClose}>확인</Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// }