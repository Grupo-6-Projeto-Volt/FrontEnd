import api from "../api";

export const produtosModel = {
	listarProdutos: () => {
		let resposta = api
			.get("/produtos/loja")
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.log("Houve um erro:", erro);
				return erro;
			});
		return resposta;
	},
	buscarProdutoPorId: (id) => {
		let resposta = api
			.get(`/produtos/loja/${id}`)
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.log("Houve um erro:", erro);
				return erro;
			});
		return resposta;
	},
	pesquisaProdutos: (produtoDigitado) => {
		let produtoPesquisado = produtoDigitado;
		if (produtoPesquisado === "") {
			alert("Nenhum produto foi encontrado!");
		}
		let produtoBuscado = produtoPesquisado
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");
		let resposta = api
			.get("/produtos/loja", {
				params: {
					textoBusca: produtoBuscado,
				},
			})
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.log("Houve um erro:", erro);
				return erro;
			});
		return resposta;
	},
	buscarProdutoPorCategoria: (categoria) => {
		let resposta = api
			.get(`/produtos/filtro/filtrar-por-categoria?categoria=${categoria}`)
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.log("Houve um erro:", erro);
				return erro;
			});
		return resposta;
	},
	deletarProduto: (id) => {
		let resposta = api
			.delete(`/produtos/estoque/${id}`)
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.log("Houve um erro:", erro);
				return erro;
			});
		return resposta;
	},
};
