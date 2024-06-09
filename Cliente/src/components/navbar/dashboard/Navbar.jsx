import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { FaBell } from "react-icons/fa6";
function Navbar({ chamadosNovos }) {
	let [isNewNotification, setIsNewNotification] = useState(false);
	let [notificationAreaActive, setNotificationAreaActive] = useState(false);

	useEffect(() => {
		setIsNewNotification(chamadosNovos && chamadosNovos.length === 0);
	}, []);

	function newNotificationsBox() {
		return (
			<div
				className={styles["notification-box"]}
				style={{ visibility: notificationAreaActive ? "visible" : "hidden" }}
			></div>
		);
	}

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
						<FaBell
							color="b0c3cc"
							size={25}
							cursor={"pointer"}
							onClick={() => {
								setNotificationAreaActive(!notificationAreaActive);
							}}
						/>
						<div
							className={styles["notification-warning"]}
							style={{ visibility: isNewNotification ? "visible" : "hidden" }}
						></div>
						{newNotificationsBox()}
					</div>
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
