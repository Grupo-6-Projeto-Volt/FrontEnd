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
        textoBusca: produtoPesquisado.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
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