import api from "../api";

export const tagsModel = {
	listarTags: () => {
		let resposta = api
			.get("/tags")
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
