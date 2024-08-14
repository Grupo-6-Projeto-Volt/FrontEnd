import styles from "./InputFile.module.css";

function InputFile({ tituloCampo, multiple, onChange }) {
	return (
		<div className={styles["InputFile"]}>
			<label htmlFor="">Adicione as imagens do produto</label>
			<label htmlFor="file" className={styles["input-file-button"]}>
				{tituloCampo}
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
