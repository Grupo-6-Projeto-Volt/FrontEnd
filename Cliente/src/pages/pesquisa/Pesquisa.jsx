import { NavBarPadrao } from "../../components/navBarHome/NavBar";
import { useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
import { ProductsData } from "../../components/products/Prodcuts";


export default function Pesquisa(){
     let location = useLocation();
     const  [produto,setProduto] = useState("");
     useEffect((
     )=>{
          let valor = location.state.valor;
          setProduto(valor)
          console.log(valor);
          console.log(produto)
     },[produto])

    return(
        <>
          <NavBarPadrao/>
          <ProductsData secao='' nomeProduto={produto}/>
        </>
    )
}