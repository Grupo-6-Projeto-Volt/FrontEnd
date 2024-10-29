import api from "../api";

export const banner = {
    getBanner: () => {
        let resposta = api
            .get("/configuracoes", {
                params: {
					nameImg: 'banner',
				},
                responseType: 'arraybuffer'
            })
            .then((resultado) => {
                const arrayBuffer = resultado.data;  
                const uint8Array = new Uint8Array(arrayBuffer);  


                const blob = new Blob([uint8Array], { type: 'image/png' });
                const url = URL.createObjectURL(blob);

                return url;
            })
            .catch((erro) => {
                console.log("Houve um erro:", erro);
                return erro;
            });
        return resposta;
    },
    postBanner: (image, type) => {
        let resposta = api
            .post("/configuracoes", image, {
                params: {
					nameImg: 'banner',
				},
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