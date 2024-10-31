import api from "../api";

export const produtosModel = {
	adicionarProduto: (
		nome,
		descricao,
		preco,
		qtdEstoque,
		estadoGeral,
		desconto,
		dataInicioDesconto,
		dataFimDesconto,
		idCategoria
	) => {
		let resposta = api
			.post("/produtos/estoque", {
				nome: nome,
				descricao: descricao,
				preco: preco,
				qtdEstoque: qtdEstoque,
				estadoGeral: estadoGeral,
				desconto: desconto,
				dataInicioDesconto: dataInicioDesconto,
				dataFimDesconto: dataFimDesconto,
				idCategoria: idCategoria,
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
	listarProdutos: (limite) => {
		let resposta = api
			.get("/produtos/loja",
				{
					params: {
						limite: limite,
					},
				}
			)
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.log("Houve um erro:", erro);
				return erro;
			});
		return resposta;
	},
	buscarProdutoPorId: (id) => {
		let resposta = api
			.get(`/produtos/loja/${id}`)
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.log("Houve um erro:", erro);
				return erro;
			});
		return resposta;
	},
	pesquisaProdutos: (produtoDigitado) => {
		let produtoPesquisado = produtoDigitado;
		if (produtoPesquisado === "") {
			alert("Nenhum produto foi encontrado!");
		}
		let produtoBuscado = produtoPesquisado
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");
		let resposta = api
			.get("/produtos/loja", {
				params: {
					textoBusca: produtoBuscado,
				},
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
	buscarProdutoPorCategoria: (categoria) => {
		let resposta = api
			.get(`/produtos/filtro/filtrar-por-categoria?categoria=${categoria}`)
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.log("Houve um erro:", erro);
				return erro;
			});
		return resposta;
	},
	deletarProduto: (id) => {
		let resposta = api
			.delete(`/produtos/estoque/${id}`)
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.log("Houve um erro:", erro);
				return erro;
			});
		return resposta;
	},
	exportarProduto: () => {
		let resposta = api.get("/produtos/exportar").then((resultado) => {
			console.log('Enviou ' + resultado.data)
			const bom = '\ufeff';
			const blob = new Blob([bom + resultado.data], { type: 'text/csv;charset=utf-8' });
			const url = URL.createObjectURL(blob);
			const file = document.createElement('a');
			file.href = url;
			file.download = 'produtos.csv';
			file.click();
			URL.revokeObjectURL(url);
		})
			.catch((erro) => {
				console.log("Houve um erro:", erro);
				return erro;
			});
		return resposta;
	},
	exportarProdutoTxt:() =>{
		let resposta = api.get("/produtos/exportar-txt").then((resultado) => {
			console.log('Enviou ' + resultado.data)
			const bom = '\ufeff';
			const blob = new Blob([bom + resultado.data], { type: 'text/txt;charset=utf-8' });
			const url = URL.createObjectURL(blob);
			const file = document.createElement('a');
			file.href = url;
			file.download = 'produtos.txt';
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
		api.get("/produtos/exportar-json", { responseType: 'blob' })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'produtos.json';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch((erro) => {
            console.log("Não foi possível baixar um arquivo JSON:", erro);
        });
	},
	exportarXml: () => {
		api.get("/produtos/exportar-xml", { responseType: 'blob' })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'produtos.xml';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch((erro) => {
            console.log("Não foi possível baixar um arquivo XML:", erro);
        });
	},
	exportarParquet: () => {
		api.get("/produtos/exportar-parquet", { responseType: 'blob' })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'produtos.parquet';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch((erro) => {
            console.log("Não foi possível baixar um arquivo PARQUET:", erro);
        });
	},
	
	alterarProduto: (
		id,
		nome,
		descricao,
		preco,
		qtdEstoque,
		estadoGeral,
		desconto,
		dataInicioDesconto,
		dataFimDesconto,
		idCategoria,
		tags,
	) => {
		let resposta = api
			.put(`/produtos/estoque/${id}`, {
				nome: nome,
				descricao: descricao,
				preco: preco,
				qtdEstoque: qtdEstoque,
				estadoGeral: estadoGeral,
				desconto: desconto,
				dataInicioDesconto: dataInicioDesconto,
				dataFimDesconto: dataFimDesconto,
				idCategoria: idCategoria,
				tags: tags
			})
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.log("Houve um erro:", erro);
				return erro;
			});
		return resposta;
	}
};
