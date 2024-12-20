import api from "../api";

export const classificacaoProdutosModel = {
	associarTagProduto: (idProduto, idTag) => {
		let resposta = api
			.post(`/classificacao-produtos?idProduto=${idProduto}&idTag=${idTag}`)
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.error("Houve um erro: " + erro);
				return erro;
			});
		return resposta;
	},
	desassociarTagProduto: (idProduto) => {
		let resposta = api
			.delete(`/classificacao-produtos/deletar-tags-produto/${idProduto}`)
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.error("Houve um erro: " + erro);
				return erro;
			});
		return resposta;
	},
};
