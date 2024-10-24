import styles from "./InputDatalist.module.css";

function InputDatalist({ tituloCampo, value, values, onClick, onChange }) {
	return (
		<div className={styles["InputDatalist"]}>
			<label htmlFor="lista">{tituloCampo}</label>
			<div className={styles["input-datalist"]}>
				<input
					list="lista"
					value={value}
					className={styles["input"]}
					id="inputList"
					onChange={(e) => onChange(e)}
				/>
				<datalist id="lista">
					{values.map((item, key) => (
						<option key={key} value={item}></option>
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
