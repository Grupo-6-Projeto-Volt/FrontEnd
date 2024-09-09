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
    }
}