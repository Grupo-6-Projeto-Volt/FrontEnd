import styles from "./ProdutosList.module.css";
import { produtos } from "../../model/ProdutosListModel";
import { produtosModel } from "../../model/produtosModel.js";
import { Produto } from "../productcard/ProductCard";
import React, { useEffect, useState } from "react";
import { clickProd } from "./ProdutosList.js";
import { useNavigate, useLocation } from "react-router-dom";
import Padrao from "../../utils/assets/img/img-padrao.png";

export const itemWidth = 130;
export const padding = 16;
export const prev = document.getElementById("prev-btn");
export const next = document.getElementById("next-btn");
export function ProdutosData({ secao, nome, produtoExemplo }) {
  let [dadosProduto, setDadosProduto] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const navigateToProduct = (idProduto) => {
    if (location.pathname === `/productpage`) {
      navigate(`/productpage`);
      localStorage.setItem("idProduto", idProduto);
      window.location.reload();
    } else {
      navigate(`/productpage`);
      localStorage.setItem("idProduto", idProduto);
    }
    clickProd.adicionaClick();
  };

  function handleClick(btn) {
    const list = document.getElementById(`item-list-${nome}`);
    const itemWidth = 185;
    const padding = 8;
    if (btn === "prev") {
      list.scrollLeft -= itemWidth + padding;
    } else {
      list.scrollLeft += itemWidth + padding;
    }
  }
  async function getProdutos() {
    if (!produtoExemplo) {
      let response;
      try {
        switch (secao) {
          case "Ofertas":
            response = await produtos.listarOfertas();
            break;
          case "Recomendados":
            response = await produtosModel.listarRecomendados(undefined);
            break;
          default:
            response = await produtos.listarProdutos();
            break;
        }
        setDadosProduto(response);
      } catch (e) {
        console.log(e);
        return <h1>Erro</h1>;
      }
    } else {
      setDadosProduto([produtoExemplo]);
    }
  }

  useEffect(() => {
    getProdutos();
  }, []);

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["container-lista"]}>
          <h1>{secao}</h1>
          <div className={styles["linha-horizontal"]}></div>
          <div className={styles["carousel-view"]}>
            {dadosProduto.length > 0 ? (
              <button
                id={`prev-btn-${nome}`}
                onClick={handleClick.bind(this, "prev")}
                className={styles["btn-prev"]}
              ></button>
            ) : null}
            <div id={`item-list-${nome}`} className={styles["item-list"]}>
              {Array.isArray(dadosProduto) && dadosProduto.length > 0 ? (
                dadosProduto?.map((produto) => (
                  // <div onClick={() => {navigateToProduct(produto.id)}}>
                  <Produto
                    className={styles["item"]}
                    id={produto.id}
                    nome={produto.nome}
                    estado={produto.estadoGeral}
                    imgUrl={
                      produto.imagensProduto[0]
                        ? typeof produto.imagensProduto.at(0).codigoImagem !== 'string' ? URL.createObjectURL(
                          produto.imagensProduto.at(0).codigoImagem
                        ) : produto.imagensProduto.at(0).codigoImagem
                        : undefined
                    }
                    preco={produto.preco}
                    desconto={produto.desconto}
                  />
                  //  </div>
                ))
              ) : (
                <div className={styles["mensagemErro"]}>
                  <h3>
                    Não foi possível encontrar produtos.
                    <br /> Tente Novamente mais tarde.
                  </h3>
                </div>
              )}
            </div>
            {dadosProduto.length > 0 ? (
              <button
                id={`next-btn-${nome}`}
                onClick={handleClick.bind(this, "next")}
                className={styles["btn-next"]}
              ></button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
