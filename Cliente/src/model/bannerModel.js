import api from "../api";

export const banner = {
    getBanner: () => {
        let resposta = api
            .get("/configuracoes/banner")
            .then((resultado) => {
                return resultado.data;
            })
            .catch((erro) => {
                console.log("Houve um erro:", erro);
                return erro;
            });
        return resposta;
    },
    postBanner: (image, type) => {
        let resposta = api
            .post("/configuracoes/banner", image, {
                headers: {
                    'Content-Type': type
                }
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
}