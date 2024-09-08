import styles from "./DefaultButton.module.css";

function DefaultButton({ text, onClick, bgColor, fgColor, border }) {
	return (
		<button
			onClick={onClick}
			className={styles["DefaultButton"]}
			style={{ backgroundColor: bgColor, color: fgColor, border: border }}
		>
			{text}
		</button>
	);
}

export default DefaultButton;
