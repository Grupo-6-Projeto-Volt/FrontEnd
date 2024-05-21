import api from "../../apiImagens"; // Importa o módulo da API
import styles from "./Pagina.module.css"; // Importa os estilos CSS
import React, { useState, useEffect } from "react"; // Importa o React e seus hooks
import CardPagina from "../cardPagina/CardPagina"; // Importa o componente CardPagina
import logo from '../../utils/assets/logo-ichiban.png'
import { useNavigate } from "react-router-dom";


const Musicas = () => {
    const navigate = useNavigate()
    const [cardsData, setCardsData] = useState(); // Define o estado para armazenar os dados dos cartões de música

    // Função para recuperar os dados dos cartões de música da API
    function recuperarValorDoCard() {
        api.get().then((response) => { // Faz uma requisição GET para a API
            const { data } = response; // Extrai os dados da resposta
            console.log(data); // Loga os dados no console
            setCardsData(data); // Atualiza o estado com os dados recebidos da API
        }).catch(() => {
            console.log("Deu erro, tente novamente!"); // Loga uma mensagem de erro caso a requisição falhe
        });
    }

    // Hook useEffect para executar a função recuperarValorDoCard() quando o componente for montado
    useEffect(() => {
        recuperarValorDoCard();
    }, []);

    return (
        <>
         <div className={styles["box-logo"]}>
                <img src={logo} className={styles["logo"]}></img>
                <p
              onClick={() => {
                navigate("/login");
              }}
            >
              Voltar
            </p>
            </div>
            <div className={styles["content-musicas"]}>
                {/* Renderiza os cartões de música */}
                {cardsData && cardsData.map((data, index) => (
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

export default Musicas; // Exporta o componente Musicas
