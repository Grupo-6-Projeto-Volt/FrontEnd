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
};
