import styles from "./Searchbar.module.css";

function Searchbar({ onChange, onClick, placeholder }) {
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
				onClick={onClick}
			/>
			<input
				type="text"
				placeholder={placeholder}
				onChange={(e) => {
					onChange(e.target.value);
				}}
				maxLength={6}
			/>
		</div>
	);
}

export default Searchbar;
