import React, { useState, useEffect } from "react";
import styles from "./ProdutoInfo.module.css";
import { useNavigate } from "react-router-dom";
import iphonePrincipal from "../../utils/assets/img/foto-iphone-principal.png";
import imgIphoneSecundarias from "../../utils/assets/img/img-iphone-secundarias.png";
import imgIphoneSecundarias2 from "../../utils/assets/img/img-iphone-secundarias-2.png";
import imgIphoneSecundarias3 from "../../utils/assets/img/img-iphone-secundarias-3.png";
import imgIphoneSecundarias4 from "../../utils/assets/img/img-iphone-secundarias-4.png";
import { RiHeart3Fill } from "react-icons/ri";
import api from "../../api";

const ProdutoInfo = () => {
  const navigate = useNavigate();
  const [produto, setProduto] = useState([]);
  const [favoritado, setFavoritado] = useState(false);

  const handleButtonClick = () => {
    navigate("/");
  };

  const toggleFavorito = () => {
    setFavoritado(!favoritado);
  };

  useEffect(() => {
    const fetchProduto = async () => {
        var idProduto = localStorage.idProduto;
      try {
        api.get(`/produtos/loja/${idProduto}`).then((response) => {
            console.log(`/produtos/loja/${idProduto}`);
            setProduto(response.data);
        });
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
        <div className={styles["titulo"]}>
          <h1>{produto.nome}</h1>
        </div>
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
            <img
              src={iphonePrincipal}
              alt="Iphone 13 Azul"
              className={styles["img-iphonePrincipal"]}
            />
          </div>
          <div className={styles["imagens-carrossel"]}></div>
        </div>
        <div className={styles["info-produto"]}>
          <p>
            {produto.descricao}
          </p>
          <div className={styles["cores"]}>
            <p>Cores</p>
            <div className={styles["paletas"]}>
              <div className={styles["cor-vermelha"]}></div>
              <div className={styles["cor-azul"]}></div>
              <div className={styles["cor-preta"]}></div>
            </div>
          </div>
          <h3>R$ {produto.preco}</h3>
          <button className={styles["botao-comprar"]}>Comprar</button>
        </div>
      </div>
      <img
        src={imgIphoneSecundarias}
        alt="Iphone 13 Azul"
        className={styles["img-iphone-secundarias"]}
      />
      <img
        src={iphonePrincipal}
        alt="Iphone 13 Azul"
        className={styles["img-iphone-secundarias"]}
      />
      <img
        src={imgIphoneSecundarias3}
        alt="Iphone 13 Azul"
        className={styles["img-iphone-secundarias"]}
      />
      <img
        src={imgIphoneSecundarias4}
        alt="Iphone 13 Azul"
        className={styles["img-iphone-secundarias"]}
      />
    </div>
  );
};

export default ProdutoInfo;
