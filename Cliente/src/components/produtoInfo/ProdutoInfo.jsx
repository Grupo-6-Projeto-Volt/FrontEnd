import React, { useState, useEffect } from "react";
import styles from "./ProdutoInfo.module.css";
import { useNavigate } from "react-router-dom";
import { RiHeart3Fill } from "react-icons/ri";
import api from "../../api";

const ProdutoInfo = () => {
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [favoritado, setFavoritado] = useState(false);
  const [imagemPrincipal, setImagemPrincipal] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cores, setCores] = useState([]); 

  const handleButtonClick = () => {
    navigate("/");
  };

  const toggleFavorito = () => {
    setFavoritado(!favoritado);
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
      const idProduto = localStorage.idProduto;
      try {
        const response = await api.get(`/produtos/loja/${idProduto}`);
        setProduto(response.data);
  
        if (response.data && response.data.imagensProduto && response.data.imagensProduto.length > 0) {
          setImagemPrincipal(response.data.imagensProduto[0].codigoImagem);
        }
  
        const corIds = response.data.corIds; 

        if (corIds && corIds.length > 0) {
          const coresPromises = corIds.map(async (corId) => {
            const corResponse = await api.get(`/cores/${corId}`);
            return corResponse.data.hex_id; 
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
            {imagemPrincipal ? (
              <img
                id="imagemPrincipal"
                src={imagemPrincipal}
                alt="Imagem Principal do Produto"
                style={{ maxWidth: "80%"}}
              />
            ) : (
              <p>Imagem não disponível</p>
            )}
          </div>
        </div>
        <div className={styles["info-produto"]}>
          <h1>{produto ? produto.nome : "Carregando..."}</h1>
          <p>{produto ? produto.descricao : ""}</p>

          <div className={styles["cores"]}>
            <p>Cores</p>
            <div className={styles["paletas"]}>
              {cores.length > 0 ? (
                cores.map((cor, index) => (
                  <div
                    key={index}
                    className={styles["cor"]}
                    style={{ backgroundColor: cor, width: "40px", height: "40px", marginLeft: "2%", borderRadius: "100%" 
                  }}
                  ></div>
                ))
              ) : (
                <p>Sem cores disponíveis</p>
              )}
            </div>
          </div>
          <h3>
            R$ {produto ? produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0,00"}
          </h3>
          <button className={styles["botao-comprar"]} onClick={handleCompra}>
            Comprar
          </button>
        </div>
      </div>

      <div className={styles["conteiner-fotos"]}>
        {produto && produto.imagensProduto && produto.imagensProduto.length > 0 ? (
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
                  {produto.imagensProduto.slice(currentIndex, currentIndex + 4).map((imagem, index) => (
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
                  src={imagem.codigoImagem}
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
  );
};

export default ProdutoInfo;
