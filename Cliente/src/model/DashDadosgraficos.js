import api from "../api";

export const listarChamadosCanceladosConcluido = () => {
	let resposta = api
		.get("/produtochamados/capturar-dados/chamados", {})
		.then((resultado) => {
			return resultado.data;
		})
		.catch((erro) => {
			console.error("Houve um erro: " + erro);
			return erro;
		});
	return resposta;
};

export const listarCategoriasMaisAcessadas = () => {
	let resposta = api
		.get("/clicks-produtos/capturar-dados/categorias", {})
		.then((resultado) => {
			return resultado.data;
		})
		.catch((erro) => {
			console.error("Houve um erro: " + erro);
			return erro;
		});
	return resposta;
};

export const listarProdutosMaisAcessados = () => {
	let resposta = api
		.get("/clicks-produtos/capturar-dados/produtos-mais-acessados", {})
		.then((resultado) => {
			return resultado.data;
		})
		.catch((erro) => {
			console.error("Houve um erro: " + erro);
			console.error(erro);
			return erro;
		});
	return resposta;
};
