import api from "../api";

export const imagemProdutosModel = {
	associarImagemProduto: (nome, codigoImagem, indiceVt, idProduto) => {
		let resposta = api
			.post("/imagem-produtos", {
				nome: nome,
				codigoImagem: codigoImagem,
				indiceVt: indiceVt,
				idProduto: idProduto,
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
	desassociarImagemProduto: (idProduto) => {
		let resposta = api
			.delete(`/imagem-produtos/deletar-imagens-produto/${idProduto}`)
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
