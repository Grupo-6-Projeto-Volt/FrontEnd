import styles from "./InputDatalist.module.css";

function InputDatalist({ tituloCampo, onClick }) {
	return (
		<div className={styles["InputDatalist"]}>
			<label htmlFor="lista">{tituloCampo}</label>
			<div className={styles["input-datalist"]}>
				<input list="lista" className={styles["input"]} id="inputList" />
				<datalist id="lista">
					<option value="Popular"></option>
					<option value="Lançamento"></option>
				</datalist>
				<button className={styles["input-tags-button"]} onClick={onClick}>
					Adicionar tag
				</button>
			</div>
		</div>
	);
}

export default InputDatalist;
