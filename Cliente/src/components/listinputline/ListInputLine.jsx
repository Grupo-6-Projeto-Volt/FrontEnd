import styles from "./ListInputLine.module.css";

function ListInputLine() {
	return (
		<div className={styles["ListInputLine"]}>
			<input type="text" placeholder="Digite um item..." />
			<button>Adicionar</button>
		</div>
	);
}
