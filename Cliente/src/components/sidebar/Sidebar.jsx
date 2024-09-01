import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import {
	FaCartShopping,
	FaFileLines,
	FaChartColumn,
	FaGear,
	FaUser,
	FaTags,
	FaList,
} from "react-icons/fa6";

function Sidebar() {
	let navigate = useNavigate();
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
									location.pathname === "/dashboard-chamados"
										? "content-item-active"
										: "content-item"
								]
							}
							onClick={() => navigate("/dashboard")}
						>
							<div className={styles["content-block"]}>
								<FaFileLines />
								<span>Clientes</span>
							</div>
						</div>
						<div
							className={
								styles[
									location.pathname === "/listagem-produtos"
										? "content-item-active"
										: "content-item"
								]
							}
							onClick={() => navigate("/listagem-produtos")}
						>
							<div className={styles["content-block"]}>
								<FaTags />
								<span>Produtos</span>
							</div>
						</div>
						<div
							className={
								styles[
									location.pathname === "/tags"
										? "content-item-active"
										: "content-item"
								]
							}
							onClick={() => navigate("/tags")}
						>
							<div className={styles["content-block"]}>
								<FaTags />
								<span>Tags</span>
							</div>
						</div>
						<div
							className={
								styles[
									location.pathname === "/categorias"
										? "content-item-active"
										: "content-item"
								]
							}
							onClick={() => navigate("/categorias")}
						>
							<div className={styles["content-block"]}>
								<FaList />
								<span>Categorias</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
