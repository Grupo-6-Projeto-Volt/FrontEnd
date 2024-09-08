import React from "react";
import styles from "./Avaliacoes.module.css";
import fotoGuilherme from "../../utils/assets/img/foto-guilherme.png"
import fotoJulia from "../../utils/assets/img/foto-julia.png"
import fotoEdson from "../../utils/assets/img/foto-edson.png"
import star from "../../utils/assets/img/star.png"

const Avaliacoes = () => {
    return (
        <div className={styles["container-avaliacoes"]}>
            <h1>Avaliações</h1>
            <div className={styles["linha-horizontal"]}></div>
            <div className={styles["avaliacoes"]}>
                <div className={styles["avaliacao"]}>
                    <div className={styles["avaliacao-info"]}>
                        <div className={styles["avaliacao-foto"]}>
                            <img src={fotoGuilherme} alt="fotoGuilherme" className={styles["img-fotoGuilherme"]} />
                        </div>
                        <div className={styles["avaliacao-nome"]}>
                            <div>João Dias</div>
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
                        <p>Ótima experiência de compra! Atendimento <br></br
                        >excelente e preços competitivos. Produto <br></br>
                        chegou em perfeito estado.</p>
                    </div>
                </div>
                <div className={styles["avaliacao"]}>
                    <div className={styles["avaliacao-info"]}>
                        <div className={styles["avaliacao-foto"]}>
                            <img src={fotoJulia} alt="fotoJulia" className={styles["img-julia"]} />
                        </div>
                        <div className={styles["avaliacao-nome"]}>
                            <div>Julia Robert</div>
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
                        <p>Variedade e preços bons. Atendimento <br></br>
                        poderia ser mais rápido. No geral, estou <br></br>
                        satisfeito com a compra.</p>
                    </div>
                </div>
                <div className={styles["avaliacao"]}>
                    <div className={styles["avaliacao-info"]}>
                        <div className={styles["avaliacao-foto"]}>
                            <img src={fotoEdson} alt="fotoEdson" className={styles["img-edson"]} />
                        </div>
                        <div className={styles["avaliacao-nome"]}>
                            <div>Edson Silva</div>
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
                        <p>Bom produto, mas a entrega atrasou. <br></br>
                        Comunicação com o serviço ao cliente deve <br></br>
                        melhorar.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Avaliacoes;
