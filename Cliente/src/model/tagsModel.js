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
	},
	exportarJson: () => {
		api.get("/tags/exportar-json", { responseType: 'blob' })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'tags.json';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch((erro) => {
            console.log("Não foi possível baixar um arquivo JSON:", erro);
        });
	},
	exportarXml: () => {
		api.get("/tags/exportar-xml", { responseType: 'blob' })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'tags.xml';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch((erro) => {
            console.log("Não foi possível baixar um arquivo XML:", erro);
        });
	},
	exportarParquet: () => {
		api.get("/tags/exportar-parquet", { responseType: 'blob' })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'tags.parquet';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch((erro) => {
            console.log("Não foi possível baixar um arquivo Parquet:", erro);
        });
	}
};
