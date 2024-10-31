import BarData from "../../components/barchart/Barchart.jsx";
import { bar_data, bar_options } from "../../components/barchart/Bardata.js";
import styles from "./Dashboard.module.css";
import { Kpi } from "../../components/kpi/Kpi.jsx";
import Navbar from "../../components/navbar/dashboard/Navbar";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import { ProductsData } from "../../components/products/Prodcuts.jsx";
import { useObterDadosCategoriaGrafico, gerarBarData } from "../../components/barchart/Bardata.js";
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
	const [isDataLoaded, setIsDataLoaded] = useState(false);

	const navigate = useNavigate();

	function validateAuthentication() {
		if (!validateAuth() || sessionStorage.CATEGORIA !== "1") {
			navigate("/login");
		}
	}

	async function taxaDeRetorno() {
		let { taxaRetorno } = await capturarTaxaDeRetorno();
		setTaxaRetorno(taxaRetorno.toFixed(2))
	}

	async function faturamento() {
		let { faturamento } = await obterFaturamento();
		if(faturamento === null || faturamento === ""){
			setRevenue(0);
		}else{
			setRevenue(faturamento);
		}
	}

	async function totalOrdersKpi() {
		let resultado = await listarAcessosNosUltimosSeteDias();
		if(resultado === null || resultado === ""){
			setTotalOrders(resultado);
		}else{
			Object.values(resultado).map((value) => {
				setTotalOrders(value)
			})
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

	// async function dadosCategoria() {
	// 	let resultado = await ObterDadosCategoriaGrafico();
	// 	bar_data.datasets[0].data = resultado;
	// 	setIsDataLoaded(true);
	// }
	const { dadosCategorias, labels } = useObterDadosCategoriaGrafico(); // Use o Hook personalizado

    // Crie os dados do gráfico usando os dados retornados
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
			<div className={styles["Navbar"]}>
				<Navbar />
			</div>
			<div className={styles["Content"]}>
				<div className={styles["Sidebar"]}>
					<Sidebar />
				</div>
				<div className={styles["Dataviz"]}>
					<div className={styles["Head"]}>
						<div className={styles["Tittle"]}>
							<h1>Dashboard Geral</h1>
						</div>
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
									<h3>Produtos mais acessados</h3>
								</div>
								<div className={styles["container"]}>
									<ul className={styles["productList"]}>
										<ProductsData />
									</ul>
								</div>
								{/* <ProdutosMaisAcessados products={ProductsData}></ProdutosMaisAcessados> */}
							</div>
						</div>
						<div className={styles["Graphics"]}>
							{/* <div className={styles["Graphictittle"]}>
								<h3>Chamados de produto</h3>
							</div>
							<div className={styles["Columngraphic"]}>
								<ColumnData
									data={column_data}
									options={column_options}
								></ColumnData>
							</div> */}
							<div className={styles["Graphictittle"]}>
								<h3>Acessos por categorias</h3>
							</div>
							<div className={styles["Bargraphic"]}>
								{
									bar_data !== undefined ? (<BarData data={bar_data} options={bar_options}></BarData>) : (
										<p>Carregando dados...</p>
									)
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
