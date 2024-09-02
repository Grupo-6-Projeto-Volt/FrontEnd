import React from "react";
import styles from "./CategoriaProdutos.module.css";
import { Produto } from "../productcard/ProductCard";
import Iphone1 from "../../utils/assets/img/img-iphone-secundarias-3.png"
import { useNavigate } from 'react-router-dom';

const CategoriaProdutos = ({ nome, dadosProduto }) => {

    const navigate = useNavigate();
    
    const handleButtonClick = () => {
            navigate('/'); 
        };

    return (
        <div className={styles["container"]}>
            <div className={styles["titulo-produtos"]}>
                <h1 className={styles["button-voltar"]} onClick={handleButtonClick}>Voltar</h1>
                <h1>Celulares</h1>
                <div className={styles["filtro"]}></div>
            </div>
            
            <div className={styles["produtos"]}>
                <div onClick={() => navigate("/productpage")} className={styles["produto"]}>
                    <h4>Estado: Novo</h4>
                    <img src={Iphone1} alt={nome} />
                    <h4 className={styles["nomeProd"]}>Iphone 13</h4>
                    <h4 className={styles["precoProd"]}>R$ 2000,00</h4>
                </div>
                <div className={styles["produto"]}>
                    <h4>Estado: Novo</h4>
                    <img src={Iphone1} alt={nome} />
                    <h4 className={styles["nomeProd"]}>Iphone 13</h4>
                    <h4 className={styles["precoProd"]}>R$ 2000,00</h4>
                </div>
                <div className={styles["produto"]}>
                    <h4>Estado: Novo</h4>
                    <img src={Iphone1} alt={nome} />
                    <h4 className={styles["nomeProd"]}>Iphone 13</h4>
                    <h4 className={styles["precoProd"]}>R$ 2000,00</h4>
                </div>
                <div className={styles["produto"]}>
                    <h4>Estado: Novo</h4>
                    <img src={Iphone1} alt={nome} />
                    <h4 className={styles["nomeProd"]}>Iphone 13</h4>
                    <h4 className={styles["precoProd"]}>R$ 2000,00</h4>
                </div>
            </div>

            <div className={styles["produtos"]}>
                <div className={styles["produto"]}>
                    <h4>Estado: Novo</h4>
                    <img src={Iphone1} alt={nome} />
                    <h4 className={styles["nomeProd"]}>Iphone 13</h4>
                    <h4 className={styles["precoProd"]}>R$ 2000,00</h4>
                </div>
                <div className={styles["produto"]}>
                    <h4>Estado: Novo</h4>
                    <img src={Iphone1} alt={nome} />
                    <h4 className={styles["nomeProd"]}>Iphone 13</h4>
                    <h4 className={styles["precoProd"]}>R$ 2000,00</h4>
                </div>
                <div className={styles["produto"]}>
                    <h4>Estado: Novo</h4>
                    <img src={Iphone1} alt={nome} />
                    <h4 className={styles["nomeProd"]}>Iphone 13</h4>
                    <h4 className={styles["precoProd"]}>R$ 2000,00</h4>
                </div>
                <div className={styles["produto"]}>
                    <h4>Estado: Novo</h4>
                    <img src={Iphone1} alt={nome} />
                    <h4 className={styles["nomeProd"]}>Iphone 13</h4>
                    <h4 className={styles["precoProd"]}>R$ 2000,00</h4>
                </div>
            </div>

            <div className={styles["produtos"]}>
                <div className={styles["produto"]}>
                    <h4>Estado: Novo</h4>
                    <img src={Iphone1} alt={nome} />
                    <h4 className={styles["nomeProd"]}>Iphone 13</h4>
                    <h4 className={styles["precoProd"]}>R$ 2000,00</h4>
                </div>
                <div className={styles["produto"]}>
                    <h4>Estado: Novo</h4>
                    <img src={Iphone1} alt={nome} />
                    <h4 className={styles["nomeProd"]}>Iphone 13</h4>
                    <h4 className={styles["precoProd"]}>R$ 2000,00</h4>
                </div>
                <div className={styles["produto"]}>
                    <h4>Estado: Novo</h4>
                    <img src={Iphone1} alt={nome} />
                    <h4 className={styles["nomeProd"]}>Iphone 13</h4>
                    <h4 className={styles["precoProd"]}>R$ 2000,00</h4>
                </div>
                <div className={styles["produto"]}>
                    <h4>Estado: Novo</h4>
                    <img src={Iphone1} alt={nome} />
                    <h4 className={styles["nomeProd"]}>Iphone 13</h4>
                    <h4 className={styles["precoProd"]}>R$ 2000,00</h4>
                </div>
            </div>
        </div>
    );
};

export default CategoriaProdutos;
