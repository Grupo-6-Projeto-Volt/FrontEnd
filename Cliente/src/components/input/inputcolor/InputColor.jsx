import styles from "./InputColor.module.css";

function InputColor({ tituloCampo, onChange, onClick }) {
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
				onChange={onChange}
				onClick={onClick}
			/>
		</div>
	);
}

export default InputColor;
