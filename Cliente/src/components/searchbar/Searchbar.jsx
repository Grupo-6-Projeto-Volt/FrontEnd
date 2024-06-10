import styles from "./Searchbar.module.css";

function Searchbar({ onChange, onClick, placeholder, width, maxLength }) {
	return (
		<div className={styles["Searchbar"]} style={{ width: width }}>
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
				maxLength={maxLength}
			/>
		</div>
	);
}

export default Searchbar;
