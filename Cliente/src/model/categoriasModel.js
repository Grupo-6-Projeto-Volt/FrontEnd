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
	},
	exportarJson: () => {
		api.get("/categorias/exportar-json", { responseType: 'blob' })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'categorias.json';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch((erro) => {
            console.log("Não foi possível baixar um arquivo JSON:", erro);
        });
	},
	exportarXml: () => {
		api.get("/categorias/exportar-xml", { responseType: 'blob' })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'c.xml';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch((erro) => {
            console.log("Não foi possível baixar um arquivo XML:", erro);
        });
	},
	exportarParquet: () => {
		api.get("/categorias/exportar-parquet", { responseType: 'blob' })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'c.xml';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch((erro) => {
            console.log("Não foi possível baixar um arquivo Parquet:", erro);
        });
	}

};
