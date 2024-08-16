import styles from "./InputFile.module.css";

function InputFile({ tituloCampo, textoBotao, multiple, onChange }) {
	return (
		<div className={styles["InputFile"]}>
			<label htmlFor="">{tituloCampo}</label>
			<label htmlFor="file" className={styles["input-file-button"]}>
				{textoBotao}
			</label>
			<input
				type="file"
				name="file"
				id="file"
				multiple={multiple | false}
				accept=".png, .jpg, .jpeg"
				onChange={onChange}
			/>
		</div>
	);
}

export default InputFile;
