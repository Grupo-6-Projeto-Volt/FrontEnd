import { useEffect, useState } from "react";
import Table from "../../../components/list/Table";
import Navbar from "../../../components/navbar/dashboard/Navbar";
import Searchbar from "../../../components/searchbar/Searchbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import styles from "./Chamados.module.css";
import { chamadosModel } from "../../../model/chamadosModel";

function Chamados() {
	let [chamados, setChamados] = useState([]);
	let [headersChamados, setHeadersChamados] = useState([]);
	let [filtro, setFiltro] = useState(0);
	let [valorBuscaChamados, setValorBuscaChamados] = useState("");
	let [chamadosEncontrados, setChamadosEncontrados] = useState([]);

	async function getChamados() {
		let response = await ordenarChamados();

		if (response.error) {
			alert(response.error);
			return;
		}

		let id = 0;
		let tabelaChamados = [];

		let headersChamados = [
			"Id",
			"Nome Completo",
			"Número Telefone",
			"Produto Solicitado",
			"Data Compra",
			"Compra Realizada",
		];

		response.forEach((element) => {
			tabelaChamados.push({
				id: ++id,
				nomeCompleto: element.usuarioDto.nome,
				numeroTelefone: element.usuarioDto.telefone,
				produto: element.produtoDto.nome,
				dataCompra: element.dataHoraAbertura,
				compraRealizada: () => (
					<div className={styles["table-btn-area"]}>
						<button className={styles["table-btn-red"]}>Não</button>
						<button className={styles["table-btn-green"]}>Sim</button>
					</div>
				),
			});
		});

		setChamados(tabelaChamados);
		setHeadersChamados(headersChamados);
	}

	async function ordenarChamados() {
		let response;

		switch (filtro) {
			case "0":
				response = await chamadosModel.listarChamadosPorDataAberturaDesc();
				break;
			case "1":
				response = await chamadosModel.listarChamadosPorDataAberturaAsc();
				break;
			default:
				response = await chamadosModel.listarChamadosPorDataAberturaDesc();
		}

		return response;
	}

	function buscarChamadoPorId() {
		let chamadosEncontrados = chamados.filter((chamado) =>
			String(chamado.id).includes(valorBuscaChamados)
		);
		setChamadosEncontrados(chamadosEncontrados);
	}

	useEffect(() => {
		getChamados();
	}, []);

	let headers_clientes = ["Nome Completo", "Número Telefone", "Data", "Email"];

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
									<Searchbar
										placeholder={"Id:"}
										onChange={(e) => {
											setValorBuscaChamados(e);
										}}
										onClick={() => {
											buscarChamadoPorId();
										}}
									/>
									<div className={styles["filter-group"]}>
										<span>Filtrar por: </span>
										<select
											onChange={(e) => {
												setFiltro(e.target.value);
											}}
										>
											<option value="0">Mais Recentes</option>
											<option value="1">Mais Antigos</option>
										</select>
									</div>
								</div>
							</div>
							<div className={styles["purchase-request-list"]}>
								<Table headers={headersChamados} values={chamados} limit={4} />
							</div>
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
									<Searchbar
										placeholder={"Id:"}
										onChange={(e) => {
											console.log(e);
										}}
									/>
								</div>
							</div>
							<div className={styles["purchase-request-list"]}>
								<Table headers={headers_clientes} values={[]} limit={4} />
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}

export default Chamados;
