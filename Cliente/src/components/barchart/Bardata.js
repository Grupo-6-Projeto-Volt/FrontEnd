import { listarCategoriasMaisAcessadas } from "../../model/DashDadosgraficos";
import { useState, useEffect } from "react";

const labels = [];
const dadosCategorias = [];

export function ObterDadosCategoriaGrafico() {
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
		// console.log(resposta)
		// console.log(resposta[0].categoria)
		// console.log(resposta[0].acessos)
		if (resposta) {
			for (var i = 0; i < resposta.length; i++) {
				if (dadosCategorias.length < 3) {
					dadosCategorias.push(resposta[i].acessos);
				}
			}
			for (var i = 0; i < resposta.length; i++) {
				if (labels.length < 3) {
					labels.push(resposta[i].categoria);
				}
			}
		}
	}
}

// console.log(dadosCategorias)
// console.log(labels)
export const bar_data = {
	labels,
	datasets: [
		{
			data: dadosCategorias,
			borderColor: ["#5A6ACF", "#8593ED", "#C7CEFF"],
			backgroundColor: ["#5A6ACF", "#8593ED", "#C7CEFF"],
			borderWidth: 1,
			barPercentage: 0.5,
			categoryPercentage: 0.25,
		},
	],
};

export const bar_options = {
	indexAxis: "y",
	elements: {
		bar: {
			borderWidth: 2,
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
