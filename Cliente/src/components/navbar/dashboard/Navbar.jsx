import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
function Navbar() {
	let navigate = useNavigate();

	return (
		<div className={styles["Navbar"]}>
			<div className={styles["container"]}>
				<img
					src={require("../../../utils/assets/img/logo-ichiban.png")}
					alt="Logo da Ichiban Eletrônicos"
					style={{
						width: "13%",
						height: "auto",
						cursor: "pointer"
					}}
					onClick={() => navigate("/")}
				/>
				<div className={styles["navbar-items"]}>
					<h3 className={styles["username"]}>{sessionStorage.EMAIL}</h3>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
