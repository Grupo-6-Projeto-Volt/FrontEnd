import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import {
	FaChartColumn,
	FaTags,
	FaList,
	FaImage,
	FaStore,
} from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";

function Sidebar() {
	let navigate = useNavigate();
	const location = useLocation();

	function handleLogout() {
		sessionStorage.clear();
		navigate("/login");
	}

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
									location.pathname === "/dashboard"
										? "content-item-active"
										: "content-item"
								]
							}
							onClick={() => navigate("/dashboard")}
						>
							<div className={styles["content-block"]}>
								<FaChartColumn />
								<span>Dashboard Geral</span>
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
								<FaStore />
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
						<div
							className={
								styles[
									location.pathname === "/banners-e-propagandas"
										? "content-item-active"
										: "content-item"
								]
							}
							onClick={() => navigate("/banners-e-propagandas")}
						>
							<div className={styles["content-block"]}>
								<FaImage />
								<span>Banners e Propagandas</span>
							</div>
						</div>
					</div>
				</div>
				<div className={styles["sidebar-logout"]}>
					<div className={styles["content-body"]}>
						<div className={styles["content-item"]} onClick={handleLogout}>
							<div className={styles["content-block"]}>
								<BiLogOut size={20} />
								<span>Sair</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
