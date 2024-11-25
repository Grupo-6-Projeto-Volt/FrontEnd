import api from "../api";

export async function capturarTaxaDeRetorno(){
		let resposta = api
			.get("/clicks-produtos/capturar-dados/taxa-de-retorno", {
			})
			.then((resultado) => {
				return resultado.data;
			})
			.catch((erro) => {
				console.error("Houve um erro: " + erro);
				return erro;
			});
            
		return resposta;
}

export const listarAcessosNosUltimosSeteDias = () => {
    let resposta = api
        .get("/produtochamados/capturar-dados/acessos-ultimos-dias", {
        })
        .then((resultado) => {
            return resultado.data;
        })
        .catch((erro) => {
            console.error("Houve um erro: " + erro);
            return erro;
        });
    return resposta;
}

export const  obterFaturamento = () => {
    let resposta = api
        .get("/produtochamados/capturar-dados/faturamento", {
        })
        .then((resultado) => {
            return resultado.data;
        })
        .catch((erro) => {
            console.error("Houve um erro: " + erro);
            return erro;
        });
    return resposta;
}

