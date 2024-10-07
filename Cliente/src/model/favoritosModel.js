import api from "../api";
export const favoritos = {
    listarFavoritos: () => {
        let resposta = api
            .get("/favoritos/lista-por-usuario", {
                params: {
                    idUsuario: sessionStorage.getItem('ID_USER')
                }
            }
            )
            .then((resultado) => {
                // console.log(resultado.data)
                return resultado.data;
            }
            )
            .catch((erro) => {
                console.log("Houve um erro:", erro)
                return erro;
            });
        return resposta;
    },
    favoritar: () => {
        let resposta = api
            .post("/favoritos",
                {
                    idUsuario: sessionStorage.getItem('ID_USER'),
                    idProduto: localStorage.idProduto
                }
            ).then((resultado) => {
                return resultado.data;
            })
            .catch((erro) => {
                console.log("Houve um erro:", erro);
                return erro;
            });
        return resposta;
    },
    verificarFavorito: () => {
        let resposta = api
            .get("/favoritos/is-favoritado", {
                params: {
                    idUsuario: sessionStorage.getItem("ID_USER"),
                    idProduto: localStorage.idProduto
                }
            }
            ).then((resultado) => {
                console.log(resultado.data)
                return resultado.data;
            }
            )
            .catch((erro) => {
                console.log("Houve um erro:", erro)
                return erro;
            });
        return resposta;
    },
    desfavoritar: (id) => {
        let resposta = api
            .delete(`/favoritos/${id}`)
            .then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.log("Houve um erro:", erro);
				return erro;
			});
		return resposta;
    }
}