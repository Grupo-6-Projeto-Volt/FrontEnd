import api from "../api";

export const listarChamadosCanceladosConcluido = () => {
	let resposta = api
		.get("/produtochamados/capturar-dados/chamados", {})
		.then((resultado) => {
			return resultado.data;
		})
		.catch((erro) => {
			console.error("Houve um erro: " + erro);
			return null;
		});
	return resposta;
};

export const listarCategoriasMaisAcessadas = (data) => {
	let resposta = api
		.get("/clicks-produtos/capturar-dados/categorias", {
			params: {
				data: data,
			},
		})
		.then((resultado) => {
			return resultado.data;
		})
		.catch((erro) => {
			console.error("Houve um erro: " + erro);
			return null;
		});
	return resposta;
};

export const listarProdutosMaisAcessados = (data) => {
	let resposta = api
		.get("/clicks-produtos/capturar-dados/produtos-mais-acessados", {
			params: {
				data: data,
			},
		})
		.then((resultado) => {
			return resultado.data;
		})
		.catch((erro) => {
			console.error("Houve um erro: " + erro);
			return null;
		});
	return resposta;
};
