import React from "react";
import styles from "./Avaliacoes.module.css";
import fotoGuilherme from "../../utils/assets/img/foto-guilherme.png"
import fotoJulia from "../../utils/assets/img/foto-julia.png"
import fotoEdson from "../../utils/assets/img/foto-edson.png"
import star from "../../utils/assets/img/star.png"
import userPadrao from "../../utils/assets/img/user_padrao.png"
const Avaliacoes = () => {
    return (
        <div className={styles["container-avaliacoes"]}>
            <h1>Avaliações</h1>
            <div className={styles["linha-horizontal"]}></div>
            <div className={styles["avaliacoes"]}>
                <div className={styles["avaliacao"]}>
                    <div className={styles["avaliacao-info"]}>
                        <div className={styles["avaliacao-foto"]}>
                            <img src={userPadrao} alt="foto-user" className={styles["img-fotoGuilherme"]} />
                        </div>
                        <div className={styles["avaliacao-nome"]}>
                            <div>Carlos Amancio</div>
                            <div>
                                <img src={star} alt="star" className={styles["img-star"]} />
                                <img src={star} alt="star" className={styles["img-star"]} />
                                <img src={star} alt="star" className={styles["img-star"]} />
                                <img src={star} alt="star" className={styles["img-star"]} />
                                <img src={star} alt="star" className={styles["img-star"]} />
                            </div>
                        </div>
                        <div className={styles["avaliacao-nota"]}>5.0</div>
                    </div>
                    <div className={styles["avaliacao-texto"]}>
                        <p>O melhor preço com um ótimo atendimento, já comprei celular novo lacrado e tbm já fiz reparo de usado. Super recomendo!!!</p>
                    </div>
                </div>
                <div className={styles["avaliacao"]}>
                    <div className={styles["avaliacao-info"]}>
                        <div className={styles["avaliacao-foto"]}>
                            <img src={userPadrao} alt="foto-user" className={styles["img-julia"]} />
                        </div>
                        <div className={styles["avaliacao-nome"]}>
                            <div>Wellington Alves</div>
                            <div>
                                <img src={star} alt="star" className={styles["img-star"]} />
                                <img src={star} alt="star" className={styles["img-star"]} />
                                <img src={star} alt="star" className={styles["img-star"]} />
                                <img src={star} alt="star" className={styles["img-star"]} />
                                <img src={star} alt="star" className={styles["img-star"]} />
                            </div>
                        </div>
                        <div className={styles["avaliacao-nota"]}>5.0</div>
                    </div>
                    <div className={styles["avaliacao-texto"]}>
                        <p>Ótimo atendimento, loja organizada e inúmeras variedades.</p>
                    </div>
                </div>
                <div className={styles["avaliacao"]}>
                    <div className={styles["avaliacao-info"]}>
                        <div className={styles["avaliacao-foto"]}>
                            <img src={userPadrao} alt="foto-user" className={styles["img-edson"]} />
                        </div>
                        <div className={styles["avaliacao-nome"]}>
                            <div>Ligia Bueno</div>
                            <div>
                                <img src={star} alt="star" className={styles["img-star"]} />
                                <img src={star} alt="star" className={styles["img-star"]} />
                                <img src={star} alt="star" className={styles["img-star"]} />
                                <img src={star} alt="star" className={styles["img-star"]} />
                                <img src={star} alt="star" className={styles["img-star"]} />
                            </div>
                        </div>
                        <div className={styles["avaliacao-nota"]}>5.0</div>
                    </div>
                    <div className={styles["avaliacao-texto"]}>
                        <p>Ótimo atendimento, produtos de qualidade e manutenções muito bem feitas! Comprei um iPhone com eles, me deram todo suporte necessário, pré e pós compra, sempre atenciosos. Meus pais fizeram troca de tela, ficamos muito satisfeitos com as peças e transparência conosco.
                         Recomendo muito!!!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Avaliacoes;
