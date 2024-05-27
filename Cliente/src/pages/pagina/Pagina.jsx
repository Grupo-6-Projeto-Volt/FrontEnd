import api from "../../apiImagens";
import styles from "./Pagina.module.css";
import React, { useState, useEffect } from "react";
import CardPagina from "../cardPagina/CardPagina";
import logo from "../../utils/assets/logo-ichiban.png";
import { useNavigate } from "react-router-dom";
import existeToken from "../../validarToken";

const Musicas = () => {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState();
  let [isLogado, setLogado] = useState();

  function recuperarValorDoCard() {
    api
      .get()
      .then((response) => {
        const { data } = response;
        console.log(data);
        setCardsData(data);
      })
      .catch(() => {
        console.log("Deu erro, tente novamente!");
      });
  }

  useEffect(() => {
    setLogado(existeToken());
  }, []);

  useEffect(() => {
    recuperarValorDoCard();
  }, []);

  return (
    <>
      <div className={styles["box"]}>
        <div>
          <img src={logo} className={styles["logo"]}></img>
        </div>
        <div>
          {!isLogado && (
            <div className={styles["box-container"]}>
              <button
                className={styles["btn"]}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Logar
              </button>
            </div>
          )}
          {isLogado && (
            <div className={styles["box-container"]}>
              <h1>{sessionStorage.EMAIL}</h1>
              <button
                className={styles["btn"]}
                onClick={() => {
                  sessionStorage.clear();
                  setLogado(false);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles["content-musicas"]}>
        {/* Renderiza os cartões de música */}
        {cardsData &&
          cardsData.map((data, index) => (
            <div key={index} className={styles["quadrado"]}>
              <CardPagina
                artista={data.artista}
                nomeMusica={data.nomeMusica}
                genero={data.genero}
                anoLancamento={data.ano}
                imagemSrc={data.imagem}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default Musicas;
