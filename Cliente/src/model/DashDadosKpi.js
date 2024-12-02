import api from "../api";

export async function capturarTaxaDeRetorno(dataInicio, dataFim) {
	let resposta = api
		.get("/clicks-produtos/capturar-dados/taxa-de-retorno", {
			params: {
				dataInicio: dataInicio,
				dataFim: dataFim,
			},
		})
		.then((resultado) => {
			console.log(resultado.data);
			return resultado.data;
		})
		.catch((erro) => {
			console.error("Houve um erro: " + erro);
			return erro;
		});

	return resposta;
}

export const listarAcessosNosUltimosSeteDias = (dataInicio, dataFim) => {
	let resposta = api
		.get("/produtochamados/capturar-dados/acessos-ultimos-dias", {
			params: {
				dataInicio: dataInicio,
				dataFim: dataFim,
			},
		})
		.then((resultado) => {
			console.log(resultado.data);
			return resultado.data;
		})
		.catch((erro) => {
			console.error("Houve um erro: " + erro);
			return erro;
		});
	return resposta;
};

export const obterFaturamento = (dataInicio, dataFim) => {
	let resposta = api
		.get("/produtochamados/capturar-dados/faturamento", {
			params: {
				dataInicio: dataInicio,
				dataFim: dataFim,
			},
		})
		.then((resultado) => {
			console.log(resultado.data);
			return resultado.data;
		})
		.catch((erro) => {
			console.error("Houve um erro: " + erro);
			return erro;
		});
	return resposta;
};
