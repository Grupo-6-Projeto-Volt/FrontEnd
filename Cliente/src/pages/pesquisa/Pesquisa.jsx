import { NavBarPadrao } from "../../components/navBarHome/NavBar";
import { useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
import { ProdutosData } from "../../components/produtoslist/ProdutosList.jsx";

export default function Pesquisa(){
     let location = useLocation();
     const  [produto,setProduto] = useState("");
     useEffect((
     )=>{
          let valor = location.state.valor;
          console.log(location)
          setProduto(valor)
          console.log(produto)
     },[produto])

    return(
        <>
          <NavBarPadrao/>
          <ProdutosData secao='Pesquisa' pesquisa={produto}/>
        </>
    )
}