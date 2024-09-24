import BarData from "../../components/barchart/Barchart.jsx";
import ColumnData from "../../components/columnchart/Columnchart.jsx";
import {
	column_data,
	column_options,
} from "../../components/columnchart/Columndata.js";
import { bar_data, bar_options } from "../../components/barchart/Bardata.js";
import styles from "./Dashboard.module.css";
import { Kpi } from "../../components/kpi/Kpi.jsx";
import Navbar from "../../components/navbar/dashboard/Navbar";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import { ProductsData } from "../../components/products/Prodcuts.jsx";
import { ObterDadosChamadosGrafico } from "../../components/columnchart/Columndata.js";
import { ObterDadosCategoriaGrafico } from "../../components/barchart/Bardata.js";
import { capturarTaxaDeRetorno } from "../../model/DashDadosKpi.js";
import { listarAcessosNosUltimosSeteDias } from "../../model/DashDadosKpi.js";
import { obterFaturamento } from "../../model/DashDadosKpi.js";
import { useEffect, useState } from "react";

export default function Dashboard() {
	let [taxaRetorno, setTaxaRetorno] = useState();
	let [totalOrders, setTotalOrders] = useState();
	let [revenueVar, setRevenue] = useState();
	async function taxaDeRetorno() {
		let { taxaRetorno } = await capturarTaxaDeRetorno();
		setTaxaRetorno(taxaRetorno.toFixed(2));
	}
	async function faturamento() {
		let { faturamento } = await obterFaturamento();
		setRevenue(faturamento);
	}
	async function totalOrdersKpi() {
		let resultado = await listarAcessosNosUltimosSeteDias();
		setTotalOrders(resultado);
	}

	// const seven_days_acess = { title: 'Total de visitantes nos últimos 7 dias', paragraph: totalOrders };
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
		paragraph: "R$ " + revenueVar + ",00",
	};

	ObterDadosChamadosGrafico();
	ObterDadosCategoriaGrafico();

	// const products = [
	//     { image: 'https://imgs.casasbahia.com.br/1562258295/1xg.jpg', name: 'Iphone 13 Pro Max', quantity: 183, id: '13802382' },
	//     { image: 'https://i5.walmartimages.com/seo/Straight-Talk-Apple-iPhone-13-Pro-Max-128GB-Gold-Prepaid-Smartphone-Locked-to-Straight-Talk_38276f17-7d6c-46dd-baa2-09aa8a5bd12d.94b4bfdbd75aa8f2478a6e531349cac8.jpeg', name: 'Iphone 13 Pro', quantity: 171, id: '13802382' },
	//     { image: 'https://imgs.casasbahia.com.br/55064660/1g.jpg', name: 'Iphone 13 Pro', quantity: 149, id: '13802382' },
	//     { image: 'https://imgs.casasbahia.com.br/1562258295/1xg.jpg', name: 'Iphone 13 Pro Max', quantity: 100, id: '13802382' },
	//     { image: 'https://i5.walmartimages.com/seo/Straight-Talk-Apple-iPhone-13-Pro-Max-128GB-Gold-Prepaid-Smartphone-Locked-to-Straight-Talk_38276f17-7d6c-46dd-baa2-09aa8a5bd12d.94b4bfdbd75aa8f2478a6e531349cac8.jpeg', name: 'Iphone 13 Pro', quantity: 72, id: '13802382' },
	//     { image: 'https://imgs.casasbahia.com.br/55064660/1g.jpg', name: 'Iphone 13 Pro', quantity: 41, id: '13802382' },
	// ];
	useEffect(() => {
		taxaDeRetorno();
	}, []);
	useEffect(() => {
		faturamento();
	}, []);
	useEffect(() => {
		totalOrdersKpi();
	}, []);
	return (
		<div className={styles["Dashboard"]}>
			<div className={styles["Navbar"]}>
				<Navbar></Navbar>
			</div>
			<div className={styles["Content"]}>
				<div className={styles["Sidebar"]}>
					<Sidebar></Sidebar>
				</div>
				<div className={styles["Dataviz"]}>
					<div className={styles["Head"]}>
						<div className={styles["Tittle"]}>
							<h1>Dashboard Geral</h1>
						</div>
						<div className={styles["Kpispace"]}>
							{/* <Kpi text={seven_days_acess}></Kpi> */}
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
							<div className={styles["Graphictittle"]}>
								<h3>Chamados de produto</h3>
							</div>
							<div className={styles["Columngraphic"]}>
								<ColumnData
									data={column_data}
									options={column_options}
								></ColumnData>
							</div>
							<div className={styles["Graphictittle"]}>
								<h3>Acessos por categorias</h3>
							</div>
							<div className={styles["Bargraphic"]}>
								<BarData data={bar_data} options={bar_options}></BarData>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
