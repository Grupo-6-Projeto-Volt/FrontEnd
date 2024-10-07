import styles from "./ExportButton.module.css"
function ExportButton({onClick, bgColor, fgColor, border }) {
	return (
		<button
			onClick={onClick}
			className={styles["ExportButton"]}
			style={{ backgroundColor: bgColor, color: fgColor, border: border }}
		>
		Exportar
		</button>
	);
}

export default ExportButton;
