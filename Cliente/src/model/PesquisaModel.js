import api from "../api";

export const pesquisaProdutos = (produtoDigitado) =>{
    let produtoPesquisado = produtoDigitado;
    if(produtoPesquisado === ''){
        alert("Nenhum produto foi encontrado!");
    }
    let produtoBuscado = produtoPesquisado.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    let resposta = api.get("/produtos/loja",{
        params:{
        textoBusca: produtoBuscado
    }
}).then((resultado)=>{
        return resultado.data;
    }).catch((erro) => {
        console.log("Houve um erro:", erro)
        return erro;
    });
    return resposta
}