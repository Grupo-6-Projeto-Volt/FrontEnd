import React, { useState } from 'react';
import styles from "./SolicitarConcerto.module.css";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SolicitarConcerto = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);    
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={styles["container-solicitarConcerto"]}>
          <div className={styles["container-pergunta"]}>
            <h2>Deseja solicitar agendamento <br></br>para conserto?</h2>
          </div>
          <div className={styles["container-texto"]}>
            <div>
                <p>Caso você queira consertar seu aparelho, <br></br>entre em contato conosco!</p>
            </div>
            <div className={styles["container-botao"]}>
            <button onClick={handleOpen}>Quero consertar</button>
            </div>
          </div>
          <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div>
            <div className={styles["conteiner-modal"]}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                    <b>Solicite o equipamento que procura</b>
                </Typography>
            </div>
            <div className={styles["conteiner-modal"]}>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              E-mail:
            </Typography>
            <input></input>
            </div>
            <div className={styles["conteiner-modal"]}>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Equipamento:
            </Typography>
            <input></input>
            </div>
            <div className={styles["conteiner-modal"]}>
            <button>Solicitar</button>
            </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
        </div>
    );
};

export default SolicitarConcerto;
