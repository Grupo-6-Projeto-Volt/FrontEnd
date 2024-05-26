import styles from "./Searchbar.module.css";

function Searchbar() {
	return (
		<div className={styles["Searchbar"]}>
			<img
				src={require("../../utils/assets/icon/lupa.png")}
				alt="Buscar"
				style={{
					width: "30px",
					height: "30px",
					cursor: "pointer",
				}}
			/>
			<input type="text" placeholder="Pesquisar" />
		</div>
	);
}

export default Searchbar;
