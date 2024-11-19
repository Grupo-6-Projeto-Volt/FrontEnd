import api from "../api";

export async function capturarTaxaDeRetorno(data) {
	let resposta = api
		.get("/clicks-produtos/capturar-dados/taxa-de-retorno", {
			params: {
				data: data,
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

export const listarAcessosNosUltimosSeteDias = (data) => {
	let resposta = api
		.get("/produtochamados/capturar-dados/acessos-ultimos-dias", {
			params: {
				data: data,
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

export const obterFaturamento = (data) => {
	let resposta = api
		.get("/produtochamados/capturar-dados/faturamento", {
			params: {
				data: data,
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
