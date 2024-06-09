import styles from "./Chamados.module.css";
import { useEffect, useState } from "react";
import { Stack } from "../../../utils/Stack";
import Table from "../../../components/list/Table";
import Sidebar from "../../../components/sidebar/Sidebar";
import { chamadosModel } from "../../../model/chamadosModel";
import Navbar from "../../../components/navbar/dashboard/Navbar";
import Searchbar from "../../../components/searchbar/Searchbar";

import {
	formatDateTime,
	formatPhoneNumber,
	validateAuth,
} from "../../../utils/global";
import { useNavigate } from "react-router-dom";

function Chamados() {
	let [chamados, setChamados] = useState([]);
	let [tabelaChamados, setTabelaChamados] = useState([]);
	let [headersChamados, setHeadersChamados] = useState([]);
	let [filtroChamados, setFiltroChamados] = useState(0);
	let [valorBuscaChamados, setValorBuscaChamados] = useState("");
	let [existemChamadosFechados, setExistemChamadosFechados] = useState();

	let [leads, setLeads] = useState([]);
	let [leadsEncontrados, setLeadsEncontrados] = useState([]);
	let [headersLeads, setHeadersLeads] = useState([]);
	let [filtroLeads, setFiltroLeads] = useState(0);

	let navigate = useNavigate();

	function validateAuthentication() {
		if (!validateAuth()) {
			alert("Você não possui acesso à esse recurso!");
			navigate("/login");
		}
	}

	async function getChamados() {
		try {
			let chamados = await ordenarChamados();
			formatarDadosTabelaChamados(chamados);
		} catch (e) {
			console.log(e);
			formatarDadosTabelaChamados(null);
		}
	}

	function getTabelaChamados() {
		let tabelaChamados = [];
		if (chamados) {
			chamados.forEach((item) => {
				tabelaChamados.push({
					id: item.id,
					nomeCompleto: item.nomeCompleto,
					numeroTelefone: formatPhoneNumber(item.numeroTelefone),
					produto: item.produto,
					dataCompra: formatDateTime(item.dataCompra),
					compraRealizada: () => (
						<div className={styles["table-btn-area"]}>
							<button
								className={styles["table-btn-red"]}
								onClick={async () => {
									await chamadosModel.cancelarChamado(item.id);
									guardarDadosNaPilha(item.id);
									getChamados();
								}}
							>
								Não
							</button>
							<button
								className={styles["table-btn-green"]}
								onClick={async () => {
									await chamadosModel.concluirChamado(item.id);
									guardarDadosNaPilha(item.id);
									getChamados();
								}}
							>
								Sim
							</button>
						</div>
					),
				});
			});
		}
		setTabelaChamados(tabelaChamados);
	}

	async function getLeads() {
		try {
			let leads = await ordenarLeads();
			formatarDadosTabelaLeads(leads);
		} catch (e) {
			console.log(e);
			formatarDadosTabelaLeads(null);
		}
	}

	function formatarDadosTabelaChamados(chamados) {
		let headersChamados = [
			"Id",
			"Nome Completo",
			"Número Telefone",
			"Produto Solicitado",
			"Data Solicitação",
			"Compra Realizada",
		];

		let chamadosFormatados = [];

		if (chamados) {
			chamados.forEach((chamado) => {
				chamadosFormatados.push({
					id: chamado.id,
					nomeCompleto: chamado.usuarioDto.nome,
					numeroTelefone: formatPhoneNumber(chamado.usuarioDto.telefone),
					produto: chamado.produtoDto.nome,
					dataCompra: formatDateTime(chamado.dataHoraAbertura),
				});
			});
		}

		setChamados(chamadosFormatados);
		setHeadersChamados(headersChamados);
	}

	function formatarDadosTabelaLeads(leads) {
		let tabelaLeads = [];
		let headersLeads = ["Nome Completo", "Número Telefone", "Email"];

		if (leads) {
			leads.forEach((lead) => {
				tabelaLeads.push({
					nomeCompleto: lead.usuarioDto.nome,
					numeroTelefone: formatPhoneNumber(lead.usuarioDto.telefone),
					email: lead.usuarioDto.email,
				});
			});
		}

		setLeads(tabelaLeads);
		setLeadsEncontrados(tabelaLeads);
		setHeadersLeads(headersLeads);
	}

	function guardarDadosNaPilha(id) {
		let { stack, top } = JSON.parse(localStorage.getItem("chamadosFechados"));

		let newStack = new Stack(stack, top);
		newStack.push(id);
		setExistemChamadosFechados(newStack.getTop());

		localStorage.setItem(
			"chamadosFechados",
			JSON.stringify({
				stack: newStack.getStack(),
				top: newStack.getTop(),
			})
		);
	}

	async function restaurarChamadoFechado() {
		let { stack, top } = JSON.parse(localStorage.getItem("chamadosFechados"));

		let newStack = new Stack(stack, top);
		await chamadosModel.restaurarChamadoFechado(newStack.pop());
		setExistemChamadosFechados(newStack.getTop());

		localStorage.setItem(
			"chamadosFechados",
			JSON.stringify({
				stack: newStack.getStack(),
				top: newStack.getTop(),
			})
		);
		getChamados();
	}

	async function ordenarChamados() {
		let response;

		switch (filtroChamados) {
			case "0":
				response = await chamadosModel.listarChamadosPorDataAberturaDesc(0);
				break;
			case "1":
				response = await chamadosModel.listarChamadosPorDataAberturaAsc(0);
				break;
			default:
				response = await chamadosModel.listarChamadosPorDataAberturaDesc(0);
		}

		return response;
	}

	async function ordenarLeads() {
		let response;

		switch (filtroLeads) {
			case "0":
				response = await chamadosModel.listarLeadsPorNomeAsc(2);
				break;
			case "1":
				response = await chamadosModel.listarLeadsPorNomeDesc(2);
				break;
			default:
				response = await chamadosModel.listarLeadsPorNomeAsc(2);
		}

		return response;
	}

	async function buscarChamadoPorId() {
		let chamadosEncontrado = await chamadosModel.buscarChamadoPorId(
			valorBuscaChamados
		);

		if (chamadosEncontrado !== null) {
			formatarDadosTabelaChamados([chamadosEncontrado]);
		} else {
			alert("Nenhum chamado encontrado");
			getChamados();
		}
	}

	function buscarLeadsPorNome(e) {
		let leadsEncontrados = leads.filter((item) =>
			item.nomeCompleto.toLowerCase().includes(e.toLowerCase())
		);
		setLeadsEncontrados(leadsEncontrados);
	}

	useEffect(() => {
		validateAuthentication();
		getChamados();
		getLeads();
		if (
			localStorage.length === 0 ||
			localStorage.getItem("chamadosFechados") === null
		) {
			localStorage.setItem(
				"chamadosFechados",
				JSON.stringify({ stack: [], top: -1 })
			);
		}
	}, []);

	useEffect(() => {
		getTabelaChamados();
	}, [chamados, existemChamadosFechados]);

	useEffect(() => {
		getChamados();
	}, [filtroChamados, existemChamadosFechados]);

	useEffect(() => {
		getLeads();
	}, [filtroLeads, chamados]);

	useEffect(() => {
		let chamadosFechados = JSON.parse(
			localStorage.getItem("chamadosFechados")
		).top;
		setExistemChamadosFechados(chamadosFechados);
	}, [setExistemChamadosFechados]);

	// setInterval(() => {
	// 	getChamados();
	// 	getLeads();
	// }, 180000);

	return (
		<div className={styles["Chamados"]}>
			<Navbar chamadosNovos={chamados} />
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
									<span
										style={{
											visibility:
												existemChamadosFechados !== -1 ? "visible" : "hidden",
											fontSize: 12,
											width: "30%",
											textAlign: "center",
											cursor: "pointer",
										}}
										onClick={async () => {
											await restaurarChamadoFechado();
										}}
									>
										Restaurar chamados fechados
									</span>
									<Searchbar
										placeholder={"Id:"}
										onChange={(e) => {
											setValorBuscaChamados(e);
										}}
										onClick={() => {
											buscarChamadoPorId();
										}}
										maxLength={6}
									/>
									<div className={styles["filter-group"]}>
										<span>Filtrar por: </span>
										<select
											onChange={(e) => {
												setFiltroChamados(e.target.value);
											}}
										>
											<option value="0">Mais Recentes</option>
											<option value="1">Mais Antigos</option>
										</select>
									</div>
								</div>
							</div>
							<div className={styles["purchase-request-list"]}>
								<Table
									headers={headersChamados}
									values={tabelaChamados}
									limit={4}
								/>
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
										placeholder={"Nome: "}
										onChange={(e) => {
											buscarLeadsPorNome(e);
										}}
										width={"10rem"}
									/>
									<div className={styles["filter-group"]}>
										<span>Filtrar por: </span>
										<select
											onChange={(e) => {
												setFiltroLeads(e.target.value);
											}}
										>
											<option value="0">Nome</option>
											<option value="1">Nome reverso</option>
										</select>
									</div>
								</div>
							</div>
							<div className={styles["purchase-request-list"]}>
								<Table
									headers={headersLeads}
									values={leadsEncontrados}
									limit={4}
								/>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}

export default Chamados;
