import styles from "./InputDatalist.module.css";

function InputDatalist({ tituloCampo, values, onClick }) {
	return (
		<div className={styles["InputDatalist"]}>
			<label htmlFor="lista">{tituloCampo}</label>
			<div className={styles["input-datalist"]}>
				<input list="lista" className={styles["input"]} id="inputList" />
				<datalist id="lista">
					{values.map((value, key) => (
						<option key={key} value={value}></option>
					))}
				</datalist>
				<button className={styles["input-tags-button"]} onClick={onClick}>
					Adicionar tag
				</button>
			</div>
		</div>
	);
}

export default InputDatalist;
