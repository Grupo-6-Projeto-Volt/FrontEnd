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
	inserirTag: (tag) => {
		let resposta = api
			.post("/tags", { tag: tag })
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
