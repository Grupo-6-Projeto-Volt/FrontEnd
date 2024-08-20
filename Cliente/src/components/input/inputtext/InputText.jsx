import styles from "./InputText.module.css";

function InputText({ tituloCampo, placeholder, onChange, onBlur }) {
	return (
		<div className={styles["InputText"]}>
			<label htmlFor="nome">{tituloCampo}</label>
			<input
				type="text"
				placeholder={placeholder}
				onChange={(e) => onChange(e)}
				onBlur={onBlur}
			/>
		</div>
	);
}

export default InputText;
