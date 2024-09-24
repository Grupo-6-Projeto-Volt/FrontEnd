import styles from "./InputDate.module.css";

function InputDate({ id, tituloCampo, onChange, onBlur }) {
	return (
		<div className={styles["InputDate"]}>
			<label htmlFor="nome">{tituloCampo}</label>
			<input
				id={id}
				type="date"
				onChange={(e) => onChange(e)}
				onBlur={onBlur}
			/>
		</div>
	);
}

export default InputDate;
