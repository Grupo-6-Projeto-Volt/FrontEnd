import api from "../api";

export const categoriasModel = {
	listarCategorias: () => {
		let resposta = api
			.get("/categorias")
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.log("Houve um erro:", erro);
				return erro;
			});
		return resposta;
	},
	buscarCategoriasPorNomeContendo: (nome) => {
		let resposta = api
			.get(`/categorias/buscar-por-nome-contendo?nome=${nome}`)
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.log("Houve um erro:", erro);
				return erro;
			});
		return resposta;
	},
	buscarCategoriaPorNome: (nome) => {
		let resposta = api
			.get(`/categorias/buscar-por-nome-categoria?nome=${nome}`)
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.log("Houve um erro:", erro);
				return erro;
			});
		return resposta;
	},
	inserirCategoria: (categoria) => {
		let resposta = api
			.post("/categorias", { nome: categoria })
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.log("Houve um erro:", erro);
				return erro;
			});
		return resposta;
	},
	deletarCategoria: (id) => {
		let resposta = api
			.delete(`/categorias/${id}`)
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.log("Houve um erro:", erro);
				return erro;
			});
		return resposta;
	},
	atualizarCategoria: (id, categoria) => {
		let resposta = api
			.patch(`/categorias/${id}?nome=${categoria}`)
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.log("Houve um erro:", erro);
				return erro;
			});
		return resposta;
	},
	exportarCategoria: ()=>{
		let resposta = api.get("/categorias/exportar").then((resultado) => {
				const bom = '\ufeff';
				const blob = new Blob([bom+resultado.data], { type: 'text/csv;charset=utf-8' });
				const url = URL.createObjectURL(blob);
				const file = document.createElement('a');
				file.href = url;
				file.download = 'categorias.csv'; 
				file.click();
				URL.revokeObjectURL(url);
			})
			.catch((erro) => {
				console.log("Houve um erro:", erro);
				return erro;
			});
		return resposta;
	}
};
