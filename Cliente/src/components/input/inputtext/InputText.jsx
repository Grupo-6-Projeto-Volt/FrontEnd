import styles from "./InputText.module.css";

function InputText({ tituloCampo, placeholder }) {
	return (
		<div className={styles["InputText"]}>
			<label htmlFor="nome">{tituloCampo}</label>
			<input type="text" placeholder={placeholder} />
		</div>
	);
}

export default InputText;
