import { useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import {
	FaCartShopping,
	FaFileLines,
	FaChartColumn,
	FaGear,
	FaUser,
} from "react-icons/fa6";

function Sidebar() {
	const location = useLocation();

	return (
		<div className={styles["Sidebar"]}>
			<div className={styles["container"]}>
				<div className={styles["sidebar-content"]}>
					<div className={styles["content-header"]}>
						<h4>MENU</h4>
					</div>
					<div className={styles["content-body"]}>
						<div
							className={
								styles[
									location.pathname === "/"
										? "content-item-active"
										: "content-item"
								]
							}
						>
							<div className={styles["content-block"]}>
								<FaFileLines />
								<span>Clientes</span>
							</div>
						</div>
						<div className={styles["content-item"]}>
							<div className={styles["content-block"]}>
								<FaChartColumn />
								<span>Dashboard Geral</span>
							</div>
						</div>
						<div className={styles["content-item"]}>
							<div className={styles["content-block"]}>
								<FaCartShopping />
								<span>Vendas</span>
							</div>
						</div>
					</div>
				</div>
				<div className={styles["sidebar-content"]}>
					<div className={styles["content-header"]}>
						<h4>OUTROS</h4>
					</div>
					<div className={styles["content-body"]}>
						<div className={styles["content-item"]}>
							<div className={styles["content-block"]}>
								<FaGear />
								<span>Settings página web</span>
							</div>
						</div>
						<div className={styles["content-item"]}>
							<div className={styles["content-block"]}>
								<FaUser />
								<span>Conta</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;