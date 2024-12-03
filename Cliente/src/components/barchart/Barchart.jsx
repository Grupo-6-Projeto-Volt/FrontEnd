import React, { useEffect, useState } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const BarData = ({ dados }) => {
	const [dadosCategorias, setDadosCategorias] = useState([]);
	const [labels, setLabels] = useState([]);

	const bar_options = {
		indexAxis: "y",
		elements: {
			bar: {
				borderWidth: 1,
			},
		},
		responsive: true,
		plugins: {
			legend: {
				display: false,
				position: "bottom",
				align: "start",
				labels: {
					usePointStyle: true,
					padding: 15,
				},
			},
		},
	};

	function adicionarDadosGrafico() {
		if (dados && dados.length > 0) {
			for (let i = 0; i < dados.length; i++) {
				setDadosCategorias((categorias) => [...categorias, dados[i].acessos]);
				setLabels((labels) => [...labels, dados[i].categoria]);
			}
		}
	}

	useEffect(() => {
		setDadosCategorias([]);
		setLabels([]);
		adicionarDadosGrafico();
	}, []);

	return (
		<Bar
			data={{
				labels,
				datasets: [
					{
						data: dadosCategorias,
						borderColor: ["#5A6ACF", "#8593ED", "#C7CEFF"],
						backgroundColor: ["#5A6ACF", "#8593ED", "#C7CEFF"],
						borderWidth: 1,
						barPercentage: 2.5,
						categoryPercentage: 0.25,
					},
				],
			}}
			options={bar_options}
		/>
	);
};

export default BarData;
