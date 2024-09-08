import styles from "./InputText.module.css";

function InputText({ id, tituloCampo, placeholder, onChange, onBlur }) {
	return (
		<div className={styles["InputText"]}>
			<label htmlFor="nome">{tituloCampo}</label>
			<input
				id={id}
				type="text"
				placeholder={placeholder}
				onChange={(e) => onChange(e)}
				onBlur={onBlur}
				className={styles["input"]}
			/>
		</div>
	);
}

export default InputText;
