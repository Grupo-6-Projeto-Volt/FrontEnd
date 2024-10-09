import api from "../../api";

export const clickProd = {
    adicionaClick: () => {
        let resposta = api
            .post("/clicks-produtos", 
                {
                    "idUsuario": sessionStorage.getItem('ID_USER') ? sessionStorage.ID_USER : null,
                    "idProduto": localStorage.idProduto
                }
            ).then((resultado) => {
                return resultado.data;
            })
            .catch((erro) => {
                console.log("Houve um erro:", erro);
                return erro;
            });
        return resposta;
    }
}