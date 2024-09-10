import styles from "./inputBigText.module.css";

function InputBigText({ id, tituloCampo, placeholder, onChange }) {
	return (
		<div className={styles["InputBigText"]}>
			<label htmlFor="nome">{tituloCampo}</label>
			<textarea
				id={id}
				placeholder={placeholder}
				rows={10}
				cols={50}
				onChange={(e) => onChange(e)}
			></textarea>
		</div>
	);
}

export default InputBigText;
