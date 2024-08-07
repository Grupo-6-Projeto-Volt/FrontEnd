import styles from "./InputFile.module.css";

function InputFile({ tituloCampo }) {
	return (
		<div className={styles["InputFile"]}>
			<label htmlFor="file" className={styles["input-file-button"]}>
				{tituloCampo}
			</label>
			<input type="file" name="file" id="file" />
		</div>
	);
}

export default InputFile;
