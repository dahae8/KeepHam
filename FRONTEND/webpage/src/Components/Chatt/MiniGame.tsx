import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

export default function MiniGame() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const users = ['사용자1', '사용자2', '사용자3']

  const getRandomIndex = function(length){
    return parseInt(Math.random() * length)
  }

  return (
    <div>
      <Button onClick={handleOpen}>실행</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            #사다리게임
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {users[getRandomIndex(users.length)]} 님이 당첨입니다!
          </Typography>
          <Button onClick={handleClose}>확인</Button>
        </Box>
      </Modal>
    </div>
  );
}