import Navbar from "../../../components/navbar/dashboard/Navbar";
import Searchbar from "../../../components/searchbar/Searchbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import styles from "./Chamados.module.css";

function Chamados() {
	return (
		<div className={styles["Chamados"]}>
			<Navbar />
			<Sidebar />
			<div className={styles["content"]}>
				<div className={styles["container"]}>
					<section>
						<div className={styles["container"]}>
							<div className={styles["section-header"]}>
								<div className={styles["section-title"]}>
									<h2>Chamados de Compra</h2>
									<h4>Solicitaram produto pelo whatsapp</h4>
								</div>
								<div className={styles["input-group"]}>
									<Searchbar />
									<div className={styles["filter-group"]}>
										<span>Filtrar por: </span>
										<select>
											<option value="0">Sim</option>
											<option value="1">Não</option>
											<option value="2">Talvez</option>
										</select>
									</div>
								</div>
							</div>
							<div className="purchase-request-list"></div>
						</div>
					</section>
					<section>
						<div className={styles["container"]}>
							<div className={styles["section-header"]}>
								<div className={styles["section-title"]}>
									<h2>Potenciais Clientes</h2>
									<h4>Cadastrados</h4>
								</div>
								<div
									className={styles["input-group"]}
									style={{ justifyContent: "right" }}
								>
									<Searchbar />
								</div>
							</div>
							<div className="purchase-request-list"></div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}

export default Chamados;
