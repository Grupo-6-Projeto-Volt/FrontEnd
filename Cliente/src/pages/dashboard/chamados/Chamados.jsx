import { useEffect, useState } from "react";
import Table from "../../../components/list/Table";
import Navbar from "../../../components/navbar/dashboard/Navbar";
import Searchbar from "../../../components/searchbar/Searchbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import styles from "./Chamados.module.css";
import { chamadosModel } from "../../../model/chamadosModel";
import { formatDateTime, formatPhoneNumber } from "../../../utils/global";
import { Stack } from "../../../utils/Stack";
import { FaArrowRotateLeft } from "react-icons/fa6";

function Chamados() {
	let [chamados, setChamados] = useState([]);
	let [headersChamados, setHeadersChamados] = useState([]);
	let [filtroChamados, setFiltroChamados] = useState(0);
	let [valorBuscaChamados, setValorBuscaChamados] = useState("");
	let [existemChamadosFechados, setExistemChamadosFechados] = useState();

	let [leads, setLeads] = useState([]);
	let [headersLeads, setHeadersLeads] = useState([]);
	let [filtroLeads, setFiltroLeads] = useState(0);
	let [valorBuscaLeads, setValorBuscaLeads] = useState("");

	async function getChamados() {
		try {
			let chamados = await ordenarChamados();
			formatarDadosTabelaChamados(chamados);
		} catch (e) {
			console.log(e);
			formatarDadosTabelaChamados(null);
		}
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
		let tabelaChamados = [];

		let headersChamados = [
			"Id",
			"Nome Completo",
			"Número Telefone",
			"Produto Solicitado",
			"Data Solicitação",
			"Compra Realizada",
		];

		if (chamados) {
			chamados.forEach((chamado) => {
				tabelaChamados.push({
					id: chamado.id,
					nomeCompleto: chamado.usuarioDto.nome,
					numeroTelefone: formatPhoneNumber(chamado.usuarioDto.telefone),
					produto: chamado.produtoDto.nome,
					dataCompra: formatDateTime(chamado.dataHoraAbertura),
					compraRealizada: () => (
						<div className={styles["table-btn-area"]}>
							<button
								className={styles["table-btn-red"]}
								onClick={() => {
									chamadosModel.cancelarChamado(chamado.id);
									guardarDadosNaPilha(chamado.id);
								}}
							>
								Não
							</button>
							<button
								className={styles["table-btn-green"]}
								onClick={() => {
									chamadosModel.concluirChamado(chamado.id);
									guardarDadosNaPilha(chamado.id);
								}}
							>
								Sim
							</button>
						</div>
					),
				});
			});
		}

		setChamados(tabelaChamados);
		setHeadersChamados(headersChamados);
	}

	function formatarDadosTabelaLeads(leads) {
		let tabelaLeads = [];
		let headersLeads = ["Id", "Nome Completo", "Número Telefone", "Email"];

		if (leads) {
			leads.forEach((lead) => {
				tabelaLeads.push({
					id: lead.id,
					nomeCompleto: lead.usuarioDto.nome,
					numeroTelefone: formatPhoneNumber(lead.usuarioDto.telefone),
					email: lead.usuarioDto.email,
				});
			});
		}

		setLeads(tabelaLeads);
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

	function restaurarChamadoFechado() {
		let { stack, top } = JSON.parse(localStorage.getItem("chamadosFechados"));

		let newStack = new Stack(stack, top);
		chamadosModel.restaurarChamadoFechado(newStack.pop());
		setExistemChamadosFechados(newStack.getTop());

		localStorage.setItem(
			"chamadosFechados",
			JSON.stringify({
				stack: newStack.getStack(),
				top: newStack.getTop(),
			})
		);
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
				response = await chamadosModel.listarLeadsPorIdAsc(2);
				break;
			case "1":
				response = await chamadosModel.listarLeadsPorIdDesc(2);
				break;
			case "2":
				response = await chamadosModel.listarLeadsPorNomeAsc(2);
				break;
			case "3":
				response = await chamadosModel.listarLeadsPorNomeDesc(2);
				break;
			default:
				response = await chamadosModel.listarLeadsPorIdAsc(2);
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

	useEffect(() => {
		getChamados();
		if (
			localStorage.length === 0 ||
			localStorage.getItem("chamadosFechados") === null
		) {
			localStorage.setItem(
				"chamadosFechados",
				JSON.stringify({ stack: [], top: -1 })
			);
		}
	}, [
		filtroChamados,
		setChamados,
		restaurarChamadoFechado,
		guardarDadosNaPilha,
	]);

	useEffect(() => {
		getLeads();
	}, [filtroLeads, setLeads]);

	useEffect(() => {
		let chamadosFechados = JSON.parse(
			localStorage.getItem("chamadosFechados")
		).top;
		setExistemChamadosFechados(chamadosFechados);
	}, [setExistemChamadosFechados]);

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
									<FaArrowRotateLeft
										visibility={
											existemChamadosFechados !== -1 ? "visible" : "hidden"
										}
										size={20}
										cursor={"pointer"}
										onClick={() => {
											restaurarChamadoFechado();
										}}
									/>
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
											setValorBuscaChamados(e);
										}}
									/>
									<div className={styles["filter-group"]}>
										<span>Ordenadar por: </span>
										<select
											onChange={(e) => {
												setFiltroLeads(e.target.value);
											}}
										>
											<option value="0">Id</option>
											<option value="1">Id reverso</option>
											<option value="2">Nome</option>
											<option value="3">Nome reverso</option>
										</select>
									</div>
								</div>
							</div>
							<div className={styles["purchase-request-list"]}>
								<Table headers={headersLeads} values={leads} limit={4} />
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}

export default Chamados;
