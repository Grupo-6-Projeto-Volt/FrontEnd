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
import { validateAuth } from "../../utils/global";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
	const [taxaRetorno, setTaxaRetorno] = useState();
	const [totalOrders, setTotalOrders] = useState();
	const [revenueVar, setRevenue] = useState();

	const navigate = useNavigate();

	function validateAuthentication() {
		if (!validateAuth() || sessionStorage.CATEGORIA !== "1") {
			navigate("/login");
		}
	}

	async function taxaDeRetorno() {
		let { taxaRetorno } = await capturarTaxaDeRetorno();
		setTaxaRetorno(taxaRetorno.toFixed(2));
	}

	async function faturamento() {
		let { faturamento } = await obterFaturamento();
		if (faturamento === null || faturamento === "") {
			setRevenue(0);
		} else {
			setRevenue(faturamento);
		}
	}

	async function totalOrdersKpi() {
		let resultado = await listarAcessosNosUltimosSeteDias();
		if (resultado === null || resultado === "") {
			setTotalOrders(resultado);
		} else {
			Object.values(resultado).map((value) => {
				setTotalOrders(value);
			});
		}
	}

	const return_tax = {
		title: "Taxa de retorno dos usúarios",
		paragraph: taxaRetorno + "%",
	};

	const total_orders = {
		title: "Total de visitantes nos últimos 7 dias",
		paragraph: totalOrders != [] ? totalOrders : 0,
	};

	const revenue = {
		title: "Faturamento",
		paragraph: "R$ " + (revenueVar ?? 0) + ",00",
	};

	const { dadosCategorias, labels } = useObterDadosCategoriaGrafico();

	const bar_data = gerarBarData(dadosCategorias, labels);
	console.log("Dados do gráfico:", bar_data);
	useEffect(() => {
		validateAuthentication();
		taxaDeRetorno();
		faturamento();
		totalOrdersKpi();
	}, []);

	return (
		<div className={styles["Dashboard"]}>
			<Navbar />
			<Sidebar />
			<div className={styles["Content"]}>
				<div className={styles["Container"]}>
					<div className={styles["Head"]}>
						<h1 className={styles["Title"]}>Dashboard Geral</h1>
						<div className={styles["Kpispace"]}>
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
								<ProductsData />
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
								{bar_data !== undefined ? (
									<BarData data={bar_data} options={bar_options}></BarData>
								) : (
									<p>Carregando dados...</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
