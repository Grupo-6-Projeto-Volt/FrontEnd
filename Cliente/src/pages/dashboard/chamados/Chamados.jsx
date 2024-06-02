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
	let [existemChamadosFechados, setExistemChamadosFechados] = useState();
	let [headersChamados, setHeadersChamados] = useState([]);
	let [filtro, setFiltro] = useState(0);
	let [valorBuscaChamados, setValorBuscaChamados] = useState("");

	async function getChamados() {
		try {
			let response = await ordenarChamados();
			formatarDadosTabelaChamados(response);
		} catch (e) {
			console.log(e);
			formatarDadosTabelaChamados(null);
		}
	}

	function formatarDadosTabelaChamados(dados) {
		let tabelaChamados = [];

		let headersChamados = [
			"Id",
			"Nome Completo",
			"Número Telefone",
			"Produto Solicitado",
			"Data Solicitação",
			"Compra Realizada",
		];

		if (dados) {
			dados.forEach((element) => {
				tabelaChamados.push({
					id: element.id,
					nomeCompleto: element.usuarioDto.nome,
					numeroTelefone: formatPhoneNumber(element.usuarioDto.telefone),
					produto: element.produtoDto.nome,
					dataCompra: formatDateTime(element.dataHoraAbertura),
					compraRealizada: () => (
						<div className={styles["table-btn-area"]}>
							<button
								className={styles["table-btn-red"]}
								onClick={() => {
									chamadosModel.cancelarChamado(element.id);
									guardarDadosNaPilha(element.id);
								}}
							>
								Não
							</button>
							<button
								className={styles["table-btn-green"]}
								onClick={() => {
									chamadosModel.concluirChamado(element.id);
									guardarDadosNaPilha(element.id);
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

		switch (filtro) {
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
	}, [filtro, setChamados, restaurarChamadoFechado, guardarDadosNaPilha]);

	useEffect(() => {
		let chamadosFechados = JSON.parse(
			localStorage.getItem("chamadosFechados")
		).top;
		setExistemChamadosFechados(chamadosFechados);
	}, [setExistemChamadosFechados]);

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
											setValorBuscaChamados(e);
										}}
									/>
								</div>
							</div>
							<div className={styles["purchase-request-list"]}>
								{/* <Table headers={headers_clientes} values={[]} limit={4} /> */}
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}

export default Chamados;
