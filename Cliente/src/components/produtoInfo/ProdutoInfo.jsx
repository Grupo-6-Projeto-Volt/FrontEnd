import React, { useState, useEffect } from "react";
import styles from "./ProdutoInfo.module.css";
import { useNavigate } from "react-router-dom";
import { RiHeart3Fill } from "react-icons/ri";
import api from "../../api";

const ProdutoInfo = () => {
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null); // Inicialize com null em vez de []
  const [favoritado, setFavoritado] = useState(false);

  const handleButtonClick = () => {
    navigate("/");
  };

  const toggleFavorito = () => {
    setFavoritado(!favoritado);
  };

  useEffect(() => {
    const fetchProduto = async () => {
      const idProduto = localStorage.idProduto;
      try {
        const response = await api.get(`/produtos/loja/${idProduto}`);
        console.log(`/produtos/loja/${idProduto}`);
        setProduto(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao buscar o produto:", error);
      }
    };

    fetchProduto();
  }, []);

  return (
    <div className={styles["conteiner"]}>
      <h1 className={styles["button-voltar"]} onClick={handleButtonClick}>
        Voltar
      </h1>
      <div className={styles["titulo-bottao"]}>
        <div className={styles["titulo"]}></div>
        <div className={styles["bottao-favoritar"]}>
          <RiHeart3Fill
            className={`${styles.heart} ${favoritado ? styles.active : ""}`}
            onClick={toggleFavorito}
          />
        </div>
      </div>
      <div className={styles["conteiner-info"]}>
        <div className={styles["imagens-produto"]}>
          <div className={styles["imagem-principal"]}>
            {produto && produto.imagensProduto && produto.imagensProduto.length > 0 ? (
              <img
                src={produto.imagensProduto[0].codigoImagem}
                alt={produto.imagensProduto[0].nome}
                width="300"
              />
            ) : (
              <p>Imagem não disponível</p>
            )}
          </div>
          <div className={styles["imagens-carrossel"]}></div>
        </div>
        <div className={styles["info-produto"]}>
          <h1>{produto ? produto.nome : "Carregando..."}</h1>
          <p>{produto ? produto.descricao : ""}</p>
          <div className={styles["cores"]}>
            <p>Cores</p>
            <div className={styles["paletas"]}>
              <div className={styles["cor-vermelha"]}></div>
              <div className={styles["cor-azul"]}></div>
              <div className={styles["cor-preta"]}></div>
            </div>
          </div>
          <h3>R$ {produto ? produto.preco : "0.00"}</h3>
          <button className={styles["botao-comprar"]}>Comprar</button>
        </div>
      </div>
      <div className={styles["conteiner-fotos"]}>
        {produto && produto.imagensProduto && produto.imagensProduto.length > 1 ? (
          <>
            {produto.imagensProduto.slice(1).map((imagem, index) => (
              <div className={styles["img-iphone-secundarias"]} key={index}>
                <img
                  src={imagem.codigoImagem}
                  alt={imagem.nome}
                  width="300"
                />
              </div>
            ))}
          </>
        ) : (
          <p>Imagens secundárias não disponíveis</p>
        )}
      </div>
    </div>
  );
};

export default ProdutoInfo;
