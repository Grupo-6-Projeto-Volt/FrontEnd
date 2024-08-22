import React, { useState, useCallback } from "react";
import styles from "./ProdutoInfo.module.css";
import { useNavigate } from 'react-router-dom';
import iphonePrincipal from "../../utils/assets/img/foto-iphone-principal.png"; 
import imgIphoneSecundarias from "../../utils/assets/img/img-iphone-secundarias.png"; 
import imgIphoneSecundarias2 from "../../utils/assets/img/img-iphone-secundarias-2.png"; 
import imgIphoneSecundarias3 from "../../utils/assets/img/img-iphone-secundarias-3.png"; 
import imgIphoneSecundarias4 from "../../utils/assets/img/img-iphone-secundarias-4.png"; 
import whatsapp from "../../utils/assets/img/whatsapp.png"; 

import { RiHeart3Fill } from 'react-icons/ri';

const ProdutoInfo = () => {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/'); 
    };

    // Botao de favoritar

    const [favoritado, setFavoritado] = useState(false);

    const toggleFavorito = useCallback(() => {
        setFavoritado(!favoritado);
    }, [favoritado]);

    // Cores

    const [activeColor, setActiveColor] = useState(0);
  
    const handleColorClick = (index) => {
      setActiveColor(index);
    };

    // imagens

    const [selectedImage, setSelectedImage] = useState(
        iphonePrincipal,
      );
    
      const images = [
        iphonePrincipal,
        imgIphoneSecundarias,
        imgIphoneSecundarias2,
        imgIphoneSecundarias3,
        imgIphoneSecundarias4
      ];
    
      const handleImageClick = (src) => {
        setSelectedImage(src);
      };

    // whatsapp

    const numeroWhatsapp = "5511994425521";
    const mensagem = "Olá, estou interessado em comprar o Apple iPhone 13 azul - 128GB.";

    const handleWhatsAppClick = () => {
        window.location.href = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.buttonVoltar} onClick={handleButtonClick}>Voltar</h1>
            <div className={styles.tituloBotao}>
                <div className={styles.titulo}>
                    <h1>Apple Iphone 13 azul - 128gb</h1>
                </div>
                <div className={styles.botaoFavoritar}>
                    <RiHeart3Fill
                        className={`${styles.heart} ${favoritado ? styles.active : ''}`}
                        onClick={toggleFavorito}
                    />
                </div>  
            </div>
            <div className={styles.containerInfo}>
                <div className={styles.imagensProduto}>
                    <div className={styles.imagemPrincipal}>
                                        <div className={styles.productView}>
                            <img src={selectedImage} alt="Product" className={styles.toFull} />
                        </div>
                        <div className={styles.productMedia}>
                            {images.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Thumbnail ${index}`}
                                className={`${styles.thumbnail} ${
                                src === selectedImage ? styles.select : ""
                                }`}
                                onClick={() => handleImageClick(src)}
                            />
                            ))}
                        </div>
                    </div>
                    <div className={styles.imagensCarrossel}></div>
                </div>
                <div className={styles.infoProduto}>
                    <p>
                        Iphone novo<br />
                        Acompanha caixa e acessórios<br />
                        128 Gb <br />
                        Cor: Azul<br />
                        6,7 pol. ou 6,1 pol<br />
                        Grande-angular de 48MP | Ultra-angular | Teleobjetiva<br />
                        Fotos em altíssima resolução (24 MP e 48 MP)<br />
                        Retratos de última geração com o Controle de Foco e de Profundidade<br />
                    </p>
                    <div className={styles.cores}>
                        <br></br>
                        <p className={styles.tituloCores}>Cores</p>
                        <div
                            className={`${styles.color} ${activeColor === 0 ? styles.active : ''}`}
                            style={{ background: '#A93933' }}
                            onClick={() => handleColorClick(0)}
                        ></div>
                        <div
                            className={`${styles.color} ${activeColor === 1 ? styles.active : ''}`}
                            style={{ background: '#394578' }}
                            onClick={() => handleColorClick(1)}
                        ></div>
                        <div
                            className={`${styles.color} ${activeColor === 2 ? styles.active : ''}`}
                            style={{ background: '#323232' }}
                            onClick={() => handleColorClick(2)}
                        ></div>
                    </div>
                    <h3>R$ 7.600,00</h3>
                    <button className={styles.botaoComprar} onClick={handleWhatsAppClick}>Comprar
                        <img src={whatsapp} alt="whatsapp" className={styles["whatsapp"]} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProdutoInfo;
