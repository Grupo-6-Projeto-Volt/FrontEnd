import styles from "./Navbar.module.css";
import { FaBell } from "react-icons/fa6";
function Navbar() {
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
				/>
				<div className={styles["navbar-items"]}>
					<div className={styles["notification-area"]}>
						<FaBell color="b0c3cc" size={25} />
						<div className={styles["notification-warning"]}></div>
					</div>
					<span className={styles["username"]}>Henrique Akira</span>
					<div className={styles["user-image-area"]}>
						<img src="" alt="" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
