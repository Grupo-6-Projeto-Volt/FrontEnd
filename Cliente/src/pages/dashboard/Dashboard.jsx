import BarData from "../../components/barchart/Barchart.jsx";
import styles from "./Dashboard.module.css";
import { Kpi } from "../../components/kpi/Kpi.jsx";
import Navbar from "../../components/navbar/dashboard/Navbar";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import { ProductsData } from "../../components/products/Prodcuts.jsx";
import { useObterDadosCategoriaGrafico } from "../../components/barchart/Bardata.js";
import { capturarTaxaDeRetorno } from "../../model/DashDadosKpi.js";
import { listarAcessosNosUltimosSeteDias } from "../../model/DashDadosKpi.js";
import { obterFaturamento } from "../../model/DashDadosKpi.js";
import { useEffect, useRef, useState } from "react";
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
import Calendar from "../../components/calendar/Calendar.jsx";
import { FaX } from "react-icons/fa6";

export default function Dashboard() {
	const initialDateRef = useRef();
	const finalDateRef = useRef();
	const [modalIsVisible, setModalIsVisible] = useState(false);
	const [dataInicial, setDataInicial] = useState(
		formatDate(new Date().toLocaleDateString())
	);
	const [dataFinal, setDataFinal] = useState(
		formatDate(new Date().toLocaleDateString())
	);
	const [selectedDateOption, setSelectedDateOption] = useState(1);
	const [taxaRetorno, setTaxaRetorno] = useState();
	const [totalOrders, setTotalOrders] = useState();
	const [revenueVar, setRevenue] = useState();
	const [produtosMaisAcessados, setProdutosMaisAcessados] = useState([]);
	const [categoriasMaisAcessadas, setCategoriasMaisAcessados] = useState([]);

	const navigate = useNavigate();
	const return_tax = {
		title: "Taxa de retorno dos usúarios",
		paragraph: taxaRetorno + "%",
	};

	const total_orders = {
		title: "Total de visitantes",
		paragraph: totalOrders,
	};

	const revenue = {
		title: "Faturamento estimado (R$)",
		paragraph: "R$ " + Number(revenueVar).toLocaleString() ?? 0,
	};

	const datePickerOptions = [
		"Ontem",
		"Últimos 7 dias",
		"Últimos 15 dias",
		"Últimos 30 dias",
	];

	function validateAuthentication() {
		if (!validateAuth() || sessionStorage.CATEGORIA !== "1") {
			navigate("/login");
		}
	}

	async function taxaDeRetorno() {
		let { taxaRetorno } = await capturarTaxaDeRetorno(dataInicial, dataFinal);
		if (!taxaRetorno) {
			setTaxaRetorno(0);
		} else {
			setTaxaRetorno(taxaRetorno.toFixed(2));
		}
	}

	async function faturamento() {
		let { faturamento } = await obterFaturamento(dataInicial, dataFinal);
		if (!faturamento) {
			setRevenue(0);
		} else {
			setRevenue(faturamento);
		}
	}

	async function totalOrdersKpi() {
		let resultado = await listarAcessosNosUltimosSeteDias(
			dataInicial,
			dataFinal
		);
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
			var resposta = await listarProdutosMaisAcessados(dataInicial, dataFinal);
			setProdutosMaisAcessados(resposta);
		} catch (e) {
			console.log(e);
			return <h1>Erro</h1>;
		}
	}

	async function obterCategoriasAcessadas() {
		setCategoriasMaisAcessados([]);
		try {
			let resposta = await listarCategoriasMaisAcessadas(
				dataInicial,
				dataFinal
			);
			setCategoriasMaisAcessados(resposta);
		} catch (e) {
			console.log(e);
		}
	}

	function checkDateInterval() {
		switch (selectedDateOption) {
			case 0:
				initialDateRef.current.decreaseDays(1);
				break;
			case 1:
				initialDateRef.current.decreaseDays(7);
				break;
			case 2:
				initialDateRef.current.decreaseDays(15);
				break;
			case 3:
				initialDateRef.current.decreaseDays(30);
				break;
			default:
				initialDateRef.current.decreaseDays(1);
				break;
		}
	}

	useEffect(() => {
		validateAuthentication();
		taxaDeRetorno();
		faturamento();
		totalOrdersKpi();
		obterProdutosAcessadas();
		obterCategoriasAcessadas();
	}, [dataInicial, dataFinal]);

	useEffect(() => {
		checkDateInterval();
	}, [selectedDateOption]);

	return (
		<div className={styles["Dashboard"]}>
			<Navbar />
			<Sidebar />
			<div className={styles["Content"]}>
				<div className={styles["Container"]}>
					<div className={styles["Head"]}>
						<div className={styles["Title-Space"]}>
							<h1 className={styles["Title"]}>Dashboard Geral</h1>
							<div className={styles["input-date-area"]}>
								<span
									className={styles["Date-Picker"]}
									onClick={() => setModalIsVisible(true)}
								>
									<b>De</b>: {formatDateToLocaleString(dataInicial)}
								</span>
								<span
									className={styles["Date-Picker"]}
									onClick={() => setModalIsVisible(true)}
								>
									<b>Até:</b> {formatDateToLocaleString(dataFinal)}
								</span>
							</div>
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
									<BarData dados={categoriasMaisAcessadas} />
								) : (
									<span>
										Nenhum registro encontrado para o período selecionado...
									</span>
								)}
							</div>
						</div>
					</div>
				</div>
				<div
					style={{ display: modalIsVisible ? "flex" : "none" }}
					className={styles["DatePickerModal"]}
				>
					<div className={styles["options-menu"]}>
						{datePickerOptions.map((option, index) => (
							<button
								className={
									styles[
										index === selectedDateOption
											? "selected-date-option"
											: "button"
									]
								}
								onClick={() => {
									setSelectedDateOption(index);
									setDataInicial(initialDateRef.current.getSelectedDate());
									setDataFinal(finalDateRef.current.getSelectedDate());
								}}
								key={option}
							>
								{option}
							</button>
						))}
					</div>
					<div className={styles["date-picker-area"]}>
						<div className={styles["Container"]}>
							<div className={styles["date-picker-header"]}>
								<FaX
									size={25}
									cursor={"pointer"}
									onClick={() => setModalIsVisible(false)}
								/>
							</div>
							<div className={styles["calendar-area"]}>
								<Calendar
									ref={initialDateRef}
									label={"De"}
									onClick={() => {
										setDataInicial(initialDateRef.current.getSelectedDate());
									}}
								/>
								<Calendar
									ref={finalDateRef}
									label={"Até"}
									onClick={() => {
										setDataFinal(finalDateRef.current.getSelectedDate());
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
