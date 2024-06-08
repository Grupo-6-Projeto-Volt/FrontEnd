import api from "../api";

export const chamadosModel = {
	listarChamadosPorDataAberturaAsc: () => {
		let resposta = api
			.get("/produtochamados/filtro/buscar-por-data-abertura-asc")
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.error("Houve um erro: " + erro);
				return erro;
			});
		return resposta;
	},
	listarChamadosPorDataAberturaDesc: () => {
		let resposta = api
			.get("/produtochamados/filtro/buscar-por-data-abertura-desc")
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
