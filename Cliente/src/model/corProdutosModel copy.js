import api from "../api";

export const corProdutosModel = {
	associarCorProduto: (nome, hexId, idProduto) => {
		let resposta = api
			.post("/cor", {
				nome: nome,
				hexId: hexId,
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
};
