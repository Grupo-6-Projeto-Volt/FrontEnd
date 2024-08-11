import api from "../api";

export const pesquisaProdutos = (produtoDigitado) =>{
    let produtoPesquisado = produtoDigitado;
    console.log(produtoPesquisado)
    if(produtoPesquisado === ''){
        alert("Nenhum produto foi encontrado!");
        return 0;
    }
    let resposta = api.get("/produtos/loja",{
        params:{
        textoBusca: produtoPesquisado
    }
}).then((resultado)=>{
        console.log(resultado.data);
        return resultado.data;
    }).catch((erro) => {
        console.log("Houve um erro:", erro)
        return erro;
    });
    return resposta
}