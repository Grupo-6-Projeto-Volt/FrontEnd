import styles from "./DefaultButton.module.css";

function DefaultButton({ text, onClick }) {
	return (
		<button onClick={onClick} className={styles["DefaultButton"]}>
			{text}
		</button>
	);
}

export default DefaultButton;
