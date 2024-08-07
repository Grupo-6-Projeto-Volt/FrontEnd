import styles from "./InputFile.module.css";

function InputFile({ tituloCampo, multiple }) {
	return (
		<div className={styles["InputFile"]}>
			<label htmlFor="file" className={styles["input-file-button"]}>
				{tituloCampo}
			</label>
			<input type="file" name="file" id="file" multiple={multiple | false} />
		</div>
	);
}

export default InputFile;
