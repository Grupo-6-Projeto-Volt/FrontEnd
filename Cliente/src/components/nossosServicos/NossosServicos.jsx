import React from "react";
import styles from "./NossosServicos.module.css";
import vendaIcon from "../../utils/assets/img/vendaIcon.png"; 
import compraIcon from "../../utils/assets/img/compraIcon.png"; 
import consertoIcon from "../../utils/assets/img/consertoIcon.png"

const NossosServicos = () => {
    return (
        <div className={styles["container-servicos"]}>
            <h1>Nossos Serviços</h1>
            <div className={styles["linha-horizontal"]}></div>
            <div className={styles["servicos-grid"]}>
                <div className={styles["servicos-grid-1"]}>
                    <div className={styles["servico"]}>
                        <div className={styles["servico-img"]}>
                            <img src={consertoIcon} alt="consertoIcon" className={styles["img-consertoIcon"]} />
                        </div>
                        <div className={styles["servico-info"]}>
                            <div className={styles["servico-titulo"]}>
                                <h1>Conserto</h1>
                            </div>
                            <div className={styles["servico-texto"]}>
                                <p>Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices.</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles["servico"]}>
                        <div className={styles["servico-img"]}>
                            <img src={vendaIcon} alt="vendaIcon" className={styles["img-vendaIcon"]} />
                        </div>
                        <div className={styles["servico-info"]}>
                            <div className={styles["servico-titulo"]}>
                                <h1>Venda</h1>
                            </div>
                            <div className={styles["servico-texto"]}>
                                <p>Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles["servicos-grid-1"]}>
                    <div className={styles["servico-2"]}>
                            <div className={styles["servico-img"]}>
                                <img src={compraIcon} alt="compraIcon" className={styles["img-compraIcon"]} />
                            </div>
                            <div className={styles["servico-info"]}>
                                <div className={styles["servico-titulo"]}>
                                    <h1>Compra</h1>
                                </div>
                                <div className={styles["servico-texto"]}>
                                    <p>Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices.</p>    
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default NossosServicos;
