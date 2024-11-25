import { listarCategoriasMaisAcessadas } from "../../model/DashDadosgraficos";
import { useState, useEffect } from "react";

export function useObterDadosCategoriaGrafico() {
	const [dadosCategorias, setDadosCategorias] = useState([]);
	const [labels, setLabels] = useState([]);

	useEffect(() => {
		async function obterCategoriasAcessadas() {
			try {
				let resposta = await listarCategoriasMaisAcessadas();
				adicionarDadosGrafico(resposta);
			} catch (e) {
				console.log(e);
			}
		}

		obterCategoriasAcessadas();
	}, []);

	function adicionarDadosGrafico(resposta) {
		if (resposta) {
			const novosDados = [];
			const novosLabels = [];

			for (let i = 0; i < resposta.length; i++) {
				if (novosDados.length < 3) {
					novosDados.push(resposta[i].acessos);
				}
				if (novosLabels.length < 3) {
					novosLabels.push(resposta[i].categoria);
				}
			}

			// Atualiza o estado com os novos dados e labels
			setDadosCategorias(novosDados);
			setLabels(novosLabels);
		}
	}

	return { dadosCategorias, labels };
}

// Exportar a estrutura do gráfico para uso posterior
export function gerarBarData(dadosCategorias, labels) {
	return {
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
	};
}

export const bar_options = {
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
