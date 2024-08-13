import styles from "./InputColor.module.css";

function InputColor({ tituloCampo, onBlur, onClick }) {
	return (
		<div className={styles["InputColor"]}>
			<label>{tituloCampo}</label>
			<label htmlFor="color" className={styles["input-color-button"]}>
				Adicionar cor
			</label>
			<input
				type="color"
				name="color"
				id="color"
				onBlur={onBlur}
				onClick={onClick}
			/>
		</div>
	);
}

export default InputColor;
