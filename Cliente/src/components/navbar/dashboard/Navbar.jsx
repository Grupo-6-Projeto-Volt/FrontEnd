import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { FaBell, FaX } from "react-icons/fa6";
import { chamadosModel } from "../../../model/chamadosModel";
import {
	converterDataParaFusoBrasileiro,
	formatIsoString,
} from "../../../utils/global";
import { useNavigate } from "react-router-dom";
function Navbar() {
	let [isNewNotification, setIsNewNotification] = useState(false);
	let [notificationAreaActive, setNotificationAreaActive] = useState(false);
	let [chamadosNovos, setChamadosNovos] = useState([]);

	let navigate = useNavigate();

	async function coletarChamadosRecenters() {
		if (localStorage.getItem("dataUltimaVisualizacao") === null) {
			let date = new Date();
			let dataFormatada = converterDataParaFusoBrasileiro(
				formatIsoString(date.toISOString())
			);
			localStorage.setItem("dataUltimaVisualizacao", dataFormatada);
		}
		try {
			let chamados = await chamadosModel.buscarNovosChamados(
				0,
				localStorage.getItem("dataUltimaVisualizacao")
			);

			setChamadosNovos(chamados);

			if (chamados.length > 0) {
				setIsNewNotification(true);
			}
		} catch (error) {
			console.log("Erro: " + error);
		}
	}

	function newNotificationsBox() {
		return (
			<div
				className={styles["notification-box"]}
				style={{ visibility: notificationAreaActive ? "visible" : "hidden" }}
			>
				<div className={styles["container"]}>
					<div className={styles["notification-box-header"]}>
						<h3>Notificações</h3>
						<FaX
							size={20}
							onClick={() => setNotificationAreaActive(false)}
							cursor={"pointer"}
						/>
					</div>
					<div className={styles["notifications-box-list"]}>
						{chamadosNovos &&
							chamadosNovos.map((item) => (
								<div
									className={styles["notification-item"]}
									onClick={() => {
										navigate("/dashboard-chamados");
									}}
								>
									<div className={styles["unread-notification"]}></div>
									<h4>Solicitação Nova #{item.id}</h4>
								</div>
							))}
						{!chamadosNovos && <span>Nenhum chamado novo!</span>}
					</div>
				</div>
			</div>
		);
	}

	useEffect(() => {
		coletarChamadosRecenters();
	}, []);

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
								localStorage.setItem(
									"dataUltimaVisualizacao",
									converterDataParaFusoBrasileiro(
										formatIsoString(new Date().toISOString())
									)
								);
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
