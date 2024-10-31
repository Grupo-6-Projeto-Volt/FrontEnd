import React, { useState, useEffect } from "react";
import styles from "./ProdutoInfo.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { RiHeart3Fill } from "react-icons/ri";
import api from "../../api";
import { favoritos } from "../../model/favoritosModel";
import { AxiosError } from "axios";
import Padrao from '../../utils/assets/img/img-padrao.png'

const ProdutoInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [imagemPrincipal, setImagemPrincipal] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cores, setCores] = useState([]);
  const [produto, setProduto] = useState(null); 
  const [produtoFavorito, setProdutoFavorito] = useState(null);
  let [favoritado, setFavoritado] = useState(async () => {
    let resposta;
    try {
      resposta = await favoritos.verificarFavorito(); 
      if(sessionStorage.getItem('ID_USER') !== undefined){
        setFavoritado(!(resposta instanceof AxiosError));
        setProdutoFavorito(resposta);
      } else {
        setFavoritado(false);
      }
    }catch (e) {
      console.log(e);
      return <h1>Erro</h1>;
    }
  });

  const handleButtonClick = () => {
    navigate("/");
  };

  const toggleFavorito = () => {
    if (sessionStorage.getItem('ID_USER') !== undefined) {
      setFavoritado(favoritos.verificarFavorito())
      if (!favoritado) {
        favoritos.favoritar();
      } else {
        favoritos.desfavoritar(produtoFavorito.id);
        setFavoritado(!favoritado)
      }
    } else {
      
    }
  };

  const handleCompra = () => {
    if (produto) {
      const numeroWhatsApp = "5511994425521"; 
      const mensagem = `Olá, tenho interesse no produto: ${produto.nome} - R$ ${produto.preco}.`;
      const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
      window.open(urlWhatsApp, "_blank");
    }
  };

  const trocarImagemPrincipal = (url) => {
    setImagemPrincipal(url);
  };

  const handleNext = () => {
    if (currentIndex < produto.imagensProduto.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const fetchProduto = async () => {
      const idProduto = localStorage.getItem("idProduto"); 
      try {
        const response = await api.get(`/produtos/loja/${idProduto}`);
        setProduto(response.data);

        if (response.data?.imagensProduto?.length > 0) {
          setImagemPrincipal(response.data.imagensProduto[0].codigoImagem);
        }

        if (response.data?.coresProduto?.length > 0) {
          const coresPromises = response.data.coresProduto.map(async (cor) => {
            return cor.hexId; 
          });

          const coresResult = await Promise.all(coresPromises);
          setCores(coresResult);
        } else {
          setCores([]);
        }
      } catch (error) {
        console.error("Erro ao buscar o produto ou as cores:", error);
      }
    };

    fetchProduto();
  }, [location.pathname]);

  return (
    <div className={styles["conteiner"]}>
      <div className={styles["button-voltar"]}>
        <h3 onClick={handleButtonClick}>
          Voltar
        </h3>
        <RiHeart3Fill
              className={`${styles.heart} ${favoritado ? styles.active : ""}`}
              onClick={toggleFavorito}
            />
      </div>
      <div className={styles["conteiner-info"]}>
        <div className={styles["conteiner-imagens"]}>
          <div className={styles["imagens-produto"]}>
            <div className={styles["imagem-principal"]}>
              {imagemPrincipal ? (
                <img
                  id="imagemPrincipal"
                  src={imagemPrincipal}
                  alt="Imagem Principal do Produto"
                  style={{ maxWidth: "80%" }}
                />
              ) : (
                <p>Imagem não disponível</p>
              )}
            </div>
          </div>
          <div className={styles["conteiner-fotos"]}>
          {produto?.imagensProduto?.length > 0 ? (
            produto.imagensProduto.length > 4 ? (
              <>
                <div className={styles["carousel"]}>
                  <button
                    className={styles["btn-prev"]}
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                  >
                  </button>
                  <div className={styles["carousel-images"]}>
                    {produto.imagensProduto
                      .slice(currentIndex, currentIndex + 4)
                      .map((imagem, index) => (
                        <div
                          className={styles["img-iphone-secundarias"]}
                          key={index}
                          onClick={() => trocarImagemPrincipal(imagem.codigoImagem)}
                        >
                          <img
                            src={imagem.codigoImagem}
                            alt={imagem.nome}
                            width="300"
                          />
                        </div>
                      ))}
                  </div>
                  <button
                    className={styles["btn-next"]}
                    onClick={handleNext}
                    disabled={currentIndex >= produto.imagensProduto.length - 4}
                  >
                  </button>
                </div>
              </>
            ) : (
              produto.imagensProduto.map((imagem, index) => (
                <div
                  className={styles["img-iphone-secundarias"]}
                  key={index}
                  onClick={() => trocarImagemPrincipal(imagem.codigoImagem)}
                >
                  <img
                    src={imagem.codigoImagem !== undefined ? imagem.codigoImagem : Padrao}
                    alt={imagem.nome}
                    width="300"
                  />
                </div>
              ))
            )
          ) : (
            <p>Sem imagens disponíveis</p>
          )}
          </div>
        </div>
        <div className={styles["info-produto"]}>
            <h1 className={styles["nome-produto"]}>{produto ? produto.nome : "Carregando..."}</h1>
            <p>{produto ? produto.descricao : ""}</p>
            <h3>
                R$ {produto ? produto.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0,00"}
            </h3>
            <div className={styles["cores"]}>
              <p>Cores</p>
              <div className={styles["paletas"]}>
                {cores.length > 0 ? (
                  cores.map((cor, index) => (
                    <div
                      key={index}
                      className={styles["cor"]}
                      style={{
                        backgroundColor: cor,
                        width: "40px",
                        height: "40px",
                        marginLeft: "2%",
                        borderRadius: "100%",
                      }}
                    ></div>
                  ))
                ) : (
                  <p>Sem cores disponíveis</p>
                )}
              </div>
            </div>
            <button className={styles["botao-comprar"]} onClick={handleCompra}>
              Comprar
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProdutoInfo;
