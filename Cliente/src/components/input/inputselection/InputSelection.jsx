import styles from "./InputSelection.module.css";

function InputSelection({ id, tituloCampo, items, onChange }) {
	return (
		<div className={styles["InputSelection"]}>
			<label htmlFor="nome">{tituloCampo}</label>
			<select
				id={id}
				onChange={(e) => onChange(e)}
				className={styles["select"]}
			>
				{items &&
					items.map((item, key) => (
						<option key={key} value={item}>
							{item}
						</option>
					))}
			</select>
		</div>
	);
}

export default InputSelection;
