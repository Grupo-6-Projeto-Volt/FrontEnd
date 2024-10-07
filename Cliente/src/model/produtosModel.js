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
	exportarProduto: (produtos) => {
		console.log(produtos)
		let resposta = api.post(
			"/produtos/exportar", JSON.stringify(produtos), {
			headers: {
				"Content-Type": "application/json"
			}
		}
		).then((resultado) => {
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
		idCategoria
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
