import styles from "./InputSelection.module.css";

function InputSelection({ tituloCampo }) {
	return (
		<div className={styles["InputSelection"]}>
			<label htmlFor="nome">{tituloCampo}</label>
			<select id="">
				<option value="">Nenhum</option>
				<option value="">Novo</option>
				<option value="">Seminovo</option>
				<option value="">Outlet</option>
			</select>
		</div>
	);
}

export default InputSelection;
