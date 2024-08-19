import api from "../api";
export const produtos = {
    listarProdutos: () => {
        let resposta = api
            .get("/produtos/loja")
            .then((resultado) => {
                return resultado.data;
            }
            )
            .catch((erro) => {
                console.log("Houve um erro:", erro)
                return erro;
            });
        return resposta;
    },

    listarOfertas: () => {
        let resposta = api
            .get("/produtos/ofertas")
            .then((resultado) => {
                return resultado.data;
            }
            )
            .catch((erro) => {
                console.log("Houve um erro:", erro)
                return erro;
            });
            console.log(resposta)
        return resposta;
    }
}