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
	buscarTagPorNome: (tag) => {
		let resposta = api
			.get(`/tags/buscar-tag-por-nome?tag=${tag}`)
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
	deletarTag: (id) => {
		let resposta = api
			.delete(`/tags/${id}`)
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.log("Houve um erro:", erro);
				return erro;
			});
		return resposta;
	},
	atualizarTag: (id, tag) => {
		let resposta = api
			.patch(`/tags/${id}?tag=${tag}`)
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.log("Houve um erro:", erro);
				return erro;
			});
		return resposta;
	},
	exportarTag:()=>{
		let resposta = api.get("/tags/exportar").then((resultado) => {
				const bom = '\ufeff';
				const blob = new Blob([bom+resultado.data], { type: 'text/csv;charset=utf-8' });
				const url = URL.createObjectURL(blob);
				const file = document.createElement('a');
				file.href = url;
				file.download = 'tags.csv'; 
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
