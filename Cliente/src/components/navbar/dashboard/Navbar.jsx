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
					}}
					onClick={() => navigate("/dashboard")}
				/>
				<div className={styles["navbar-items"]}>
					<span className={styles["username"]}>{sessionStorage.EMAIL}</span>
					<div className={styles["user-image-area"]}>
						<img src="" alt="" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
