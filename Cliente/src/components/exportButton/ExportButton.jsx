import React, { useState, useRef } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from "./ExportButton.module.css";

function ExportButton({onClick, bgColor, fgColor, border }) {
  const [open, setOpen] = useState(false);
  const [showImportOptions, setShowImportOptions] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const inputFileRef = useRef(null); 

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

  const handleOpen = () => {
    setOpen(true);
    setShowImportOptions(false);
    setShowExportOptions(false);
  };
  
  const handleClose = () => setOpen(false);

  const handleImportClick = () => {
    setShowImportOptions(true);
    setShowExportOptions(false);
  };

  const handleExportClick = () => {
    setShowExportOptions(true);
    setShowImportOptions(false);
  };

  const buttonUpload = () => {
    inputFileRef.current.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`Arquivo selecionado: ${file.name}`);
    }
  };
  
  return (
    <>
      <button
        onClick={handleOpen}
        className={styles["ExportButton"]}
        style={{ backgroundColor: bgColor, color: fgColor, border: border }}
      >
        Exportar / Importar
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
		<Button 
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
            }}
          >
            &times;
          </Button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Escolha uma opção
          </Typography>
          <div className={styles["button-group"]}>
            <Button className={styles["buttonModel"]} variant="contained" onClick={handleImportClick} sx={{ mr: 2 }}>
              	Exportar
            </Button>
            <Button className={styles["buttonModel"]} variant="contained" onClick={handleExportClick}>
				Importar
            </Button>
          </div>

          {showImportOptions && (
            <div className={styles["import-options"]}>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Tipo de Importação
              </Typography>
              <Button className={styles["buttonModel"]} onClick={() => alert("PDF selecionado!")}>
			  	JSON
              </Button>
              <Button onClick={onClick} className={styles["ExportButton"]} 
			  style={{ backgroundColor: bgColor, color: fgColor, border: border }}>
                CSV
              </Button>
              <Button onClick={onClick} className={styles["ExportButton"]} 
			  style={{ backgroundColor: bgColor, color: fgColor, border: border }}>
                XML
              </Button>
              <Button onClick={onClick} className={styles["ExportButton"]} 
			  style={{ backgroundColor: bgColor, color: fgColor, border: border }}>
                Parquet
              </Button>
            </div>
          )}

          {showExportOptions && (
            <div className={styles["export-options"]}>
				<Button onClick={buttonUpload}>
					Selecionar Arquivo TXT
				</Button>
			  <input
                type="file"
                ref={inputFileRef}
                style={{ display: "none" }}
                accept=".txt" 
                onChange={handleFileUpload}
              />
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default ExportButton;
