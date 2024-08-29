import api from "../api";

export const pesquisaProdutos = (produtoDigitado) =>{
    console.log(produtoDigitado)
    let produtoPesquisado = produtoDigitado;
    console.log(produtoPesquisado)
    if(produtoPesquisado === ''){
        alert("Nenhum produto foi encontrado!");
        alert(produtoPesquisado)
    }
    let produtoBuscado = produtoPesquisado.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    console.log(produtoBuscado)
    let resposta = api.get("/produtos/loja",{
        params:{
        textoBusca: produtoBuscado
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