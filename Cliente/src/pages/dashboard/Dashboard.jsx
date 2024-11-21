import BarData from "../../components/barchart/Barchart.jsx";
import { bar_options } from "../../components/barchart/Bardata.js";
import styles from "./Dashboard.module.css";
import { Kpi } from "../../components/kpi/Kpi.jsx";
import Navbar from "../../components/navbar/dashboard/Navbar";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import { ProductsData } from "../../components/products/Prodcuts.jsx";
import {
	useObterDadosCategoriaGrafico,
	gerarBarData,
} from "../../components/barchart/Bardata.js";
import { capturarTaxaDeRetorno } from "../../model/DashDadosKpi.js";
import { listarAcessosNosUltimosSeteDias } from "../../model/DashDadosKpi.js";
import { obterFaturamento } from "../../model/DashDadosKpi.js";
import { useEffect, useState } from "react";
import {
	formatDate,
	formatDateToLocaleString,
	validateAuth,
} from "../../utils/global";
import { useNavigate } from "react-router-dom";
import {
	listarCategoriasMaisAcessadas,
	listarProdutosMaisAcessados,
} from "../../model/DashDadosgraficos.js";

export default function Dashboard() {
	const [taxaRetorno, setTaxaRetorno] = useState();
	const [totalOrders, setTotalOrders] = useState();
	const [revenueVar, setRevenue] = useState();
	const [produtosMaisAcessados, setProdutosMaisAcessados] = useState([]);
	const [categoriasMaisAcessadas, setCategoriasMaisAcessados] = useState([]);
	const [barData, setBarData] = useState({});
	const [dataSelecionada, setDataSelecionada] = useState(
		formatDate(new Date().toLocaleDateString())
	);
	const { dadosCategorias, labels } = useObterDadosCategoriaGrafico(
		categoriasMaisAcessadas
	);
	const navigate = useNavigate();
	const return_tax = {
		title: "Taxa de retorno dos usúarios do dia",
		paragraph: taxaRetorno + "%",
	};

	const total_orders = {
		title: "Total de visitantes nos últimos 7 dias",
		paragraph: totalOrders,
	};

	const revenue = {
		title: "Faturamento estimado dos últimos 7 dias (R$)",
		paragraph: "R$ " + Number(revenueVar).toLocaleString() ?? 0,
	};

	function validateAuthentication() {
		if (!validateAuth() || sessionStorage.CATEGORIA !== "1") {
			navigate("/login");
		}
	}

	async function taxaDeRetorno() {
		let { taxaRetorno } = await capturarTaxaDeRetorno(dataSelecionada);
		if (!taxaRetorno) {
			setTaxaRetorno(0);
		} else {
			setTaxaRetorno(taxaRetorno.toFixed(2));
		}
	}

	async function faturamento() {
		let { faturamento } = await obterFaturamento(dataSelecionada);
		if (!faturamento) {
			setRevenue(0);
		} else {
			setRevenue(faturamento);
		}
	}

	async function totalOrdersKpi() {
		let resultado = await listarAcessosNosUltimosSeteDias(dataSelecionada);
		if (!resultado) {
			setTotalOrders(0);
		} else {
			Object.values(resultado).forEach((value) => {
				setTotalOrders(value);
			});
		}
	}

	async function obterProdutosAcessadas() {
		try {
			var resposta = await listarProdutosMaisAcessados(dataSelecionada);
			setProdutosMaisAcessados(resposta);
		} catch (e) {
			console.log(e);
			return <h1>Erro</h1>;
		}
	}

	async function obterCategoriasAcessadas() {
		try {
			let resposta = await listarCategoriasMaisAcessadas(dataSelecionada);
			setCategoriasMaisAcessados(resposta);
		} catch (e) {
			console.log(e);
		}
	}

	function gerarDadosGrafico() {
		setBarData(gerarBarData(dadosCategorias, labels));
	}

	useEffect(() => {
		validateAuthentication();
		taxaDeRetorno();
		faturamento();
		totalOrdersKpi();
		obterProdutosAcessadas();
		obterCategoriasAcessadas();
		gerarDadosGrafico();
	}, [dataSelecionada, setDataSelecionada]);

	return (
		<div className={styles["Dashboard"]}>
			<Navbar />
			<Sidebar />
			<div className={styles["Content"]}>
				<div className={styles["Container"]}>
					<div className={styles["Head"]}>
						<div className={styles["Title-Space"]}>
							<h1 className={styles["Title"]}>Dashboard Geral</h1>
							<h1 className={styles["Data-Selecionada"]}>
								{formatDateToLocaleString(dataSelecionada)}
							</h1>
							<input
								className={styles["Date-Picker"]}
								type="date"
								value={dataSelecionada}
								onChange={(e) => {
									setDataSelecionada(e.target.value);
								}}
							/>
						</div>
						<div className={styles["Kpi-Space"]}>
							<Kpi text={return_tax}></Kpi>
							<Kpi text={total_orders}></Kpi>
							<Kpi text={revenue}></Kpi>
						</div>
					</div>
					<div className={styles["Main"]}>
						<div className={styles["List"]}>
							<div className={styles["Products"]}>
								<div className={styles["Listname"]}>
									<h3 className={styles["Section-Title"]}>
										Produtos mais acessados
									</h3>
								</div>
								{produtosMaisAcessados && produtosMaisAcessados.length > 0 ? (
									<ProductsData dados={produtosMaisAcessados} />
								) : (
									<span>
										Nenhum registro encontrado para o período selecionado...
									</span>
								)}
							</div>
						</div>
						<div className={styles["divisor"]}></div>
						<div className={styles["Graphics"]}>
							<div className={styles["Graphictittle"]}>
								<h3 className={styles["Section-Title"]}>
									Acessos por categorias
								</h3>
							</div>
							<div className={styles["Bargraphic"]}>
								{categoriasMaisAcessadas &&
								categoriasMaisAcessadas.length > 0 ? (
									<BarData dados={categoriasMaisAcessadas}></BarData>
								) : (
									<span>
										Nenhum registro encontrado para o período selecionado...
									</span>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
