import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./ExportButton.module.css";
import { produtosModel } from "../../model/produtosModel";
import { categoriasModel } from "../../model/categoriasModel";
import { tagsModel } from "../../model/tagsModel";

function ExportButton({ page, bgColor, fgColor, border }) {
	const [open, setOpen] = useState(false);
	const [showImportOptions, setShowImportOptions] = useState(false);
	const [showExportOptions, setShowExportOptions] = useState(false);
	const inputFileRef = useRef(null);

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};

	const handleOpen = () => {
		setOpen(true);
		if (page === "produtos") {
			setShowImportOptions(false);
			setShowExportOptions(false);
		} else {
			setShowImportOptions(true);
			setShowExportOptions(false);
		}
	};

	const buttonFecharModel = () => setOpen(false);

	const handleImportClick = () => {
		setShowExportOptions(true);
		setShowImportOptions(false);
	};

	const handleExportClick = () => {
		setShowImportOptions(true);
		setShowExportOptions(false);
	};

	const buttonUpload = () => {
		inputFileRef.current.click();
	};

	const options = {
		produtos: [
			{
				feature: "TXT",
				onClick: () => {
					produtosModel.exportarProdutoTxt();
				},
			},
			{
				feature: "CSV",
				onClick: () => {
					produtosModel.exportarProduto();
				},
			},
			{
				feature: "JSON",
				onClick: () => {
					produtosModel.exportarJson();
				},
			},
			{
				feature: "XML",
				onClick: () => {
					produtosModel.exportarXml();
				},
			},
			{
				feature: "Parquet",
				onClick: () => {
					produtosModel.exportarParquet();
				},
			},
		],
		categorias: [
			{
				feature: "CSV",
				onClick: () => {
					categoriasModel.exportarCategoria();
				},
			},
			{
				feature: "JSON",
				onClick: () => {
					categoriasModel.exportarJson();
				},
			},
			{
				feature: "XML",
				onClick: () => {
					categoriasModel.exportarXml();
				},
			},
			{
				feature: "Parquet",
				onClick: () => {
					categoriasModel.exportarParquet();
				},
			},
		],
		tags: [
			{
				feature: "CSV",
				onClick: () => {
					tagsModel.exportarTag();
				},
			},
			{
				feature: "JSON",
				onClick: () => {
					tagsModel.exportarJson();
				},
			},
			{
				feature: "XML",
				onClick: () => {
					tagsModel.exportarXml();
				},
			},
			{
				feature: "Parquet",
				onClick: () => {
					tagsModel.exportarParquet();
				},
			},
		],
	};

	const fileUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			alert(`Arquivo selecionado: ${file.name}`);
		}
	};

	// function exportarArquivo(tipo) {
	// 	if (tipo === "json") {
	// 		produtosModel.exportarJson();
	// 	}
	// }

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
				onClose={buttonFecharModel}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Button
						onClick={buttonFecharModel}
						style={{
							position: "absolute",
							top: "10px",
							right: "10px",
							background: "none",
							border: "none",
							fontSize: "18px",
							cursor: "pointer",
						}}
					>
						&times;
					</Button>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Escolha uma opção
					</Typography>

					{page === "produtos" ? (
						<div className={styles["button-group"]}>
							<Button
								className={styles["buttonModel"]}
								variant="contained"
								onClick={handleExportClick}
								sx={{ mr: 2 }}
							>
								Exportar
							</Button>
							<Button
								className={styles["buttonModel"]}
								variant="contained"
								onClick={handleImportClick}
							>
								Importar
							</Button>
						</div>
					) : null}

					{showImportOptions && (
						<div className={styles["import-options"]}>
							<Typography variant="body1" sx={{ mt: 2 }}>
								Tipo de Exportação
							</Typography>
							{options[page].map((option) => (
								<Button
									onClick={option.onClick}
									className={styles["ExportButton"]}
									style={{
										backgroundColor: bgColor,
										color: fgColor,
										border: border,
									}}
								>
									{option.feature}
								</Button>
							))}
						</div>
					)}

					{showExportOptions && (
						<div className={styles["export-options"]}>
							<Button onClick={buttonUpload}>Selecionar Arquivo TXT</Button>
							<input
								type="file"
								ref={inputFileRef}
								style={{ display: "none" }}
								accept=".txt"
								onChange={fileUpload}
							/>
						</div>
					)}
				</Box>
			</Modal>
		</>
	);
}

export default ExportButton;
