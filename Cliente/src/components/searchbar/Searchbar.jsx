import { BiSearch } from "react-icons/bi";
import styles from "./Searchbar.module.css";

function Searchbar({ onChange, onClick, placeholder, width, maxLength }) {
	return (
		<div className={styles["Searchbar"]} style={{ width: width }}>
			<BiSearch size={30} cursor={"pointer"} onClick={onClick} />
			<input
				type="text"
				placeholder={placeholder}
				onChange={(e) => {
					onChange(e.target.value);
				}}
				onBlur={onClick}
				maxLength={maxLength}
			/>
		</div>
	);
}

export default Searchbar;
