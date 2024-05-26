import styles from "./Navbar.module.css";

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
						<img
							src={require("../../../utils/assets/icon/notificacao.png")}
							alt="Notificações"
							style={{
								height: "55%",
								width: "auto",
							}}
						/>
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
