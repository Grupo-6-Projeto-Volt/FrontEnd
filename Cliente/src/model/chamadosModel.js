import api from "../api";

export const chamadosModel = {
	listarChamadosPorDataAberturaAsc: (status) => {
		let resposta = api
			.get("/produtochamados/filtro/buscar-por-data-abertura-asc", {
				params: {
					status: status,
				},
			})
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.error("Houve um erro: " + erro);
				return erro;
			});
		return resposta;
	},
	listarChamadosPorDataAberturaDesc: (status) => {
		let resposta = api
			.get("/produtochamados/filtro/buscar-por-data-abertura-desc", {
				params: {
					status: status,
				},
			})
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.error("Houve um erro: " + erro);
				return erro;
			});
		return resposta;
	},
	buscarChamadoPorId: (id) => {
		let resposta = api
			.get(`/produtochamados/${id}`)
			.then((resultado) => {
				if (resultado.status === 200) {
					return resultado.data;
				}
				return null;
			})
			.catch((erro) => {
				console.error("Houve um erro: " + erro);
				return null;
			});
		return resposta;
	},
	cancelarChamado: (id) => {
		let resposta = api
			.patch(`/produtochamados/cancelar/${id}`)
			.then((resultado) => {
				if (resultado.status === 200) {
					return resultado.data;
				}
				return null;
			})
			.catch((erro) => {
				console.error("Houve um erro: " + erro);
				return null;
			});
		return resposta;
	},
	concluirChamado: (id) => {
		let resposta = api
			.patch(`/produtochamados/concluir/${id}`)
			.then((resultado) => {
				if (resultado.status === 200) {
					return resultado.data;
				}
				return null;
			})
			.catch((erro) => {
				console.error("Houve um erro: " + erro);
				return null;
			});
		return resposta;
	},
	restaurarChamadoFechado: (id) => {
		let resposta = api
			.patch(`/produtochamados/restaurar/${id}`)
			.then((resultado) => {
				if (resultado.status === 200) {
					return resultado.data;
				}
				return null;
			})
			.catch((erro) => {
				console.error("Houve um erro: " + erro);
				return null;
			});
		return resposta;
	},
};
