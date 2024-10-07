import styles from "./ProductCard.module.css"
export const Produto = ({
    nome,
    estado,
    imgUrl,
    preco = 0


    
}) => {
    return (
        <div className={styles["produto"]}>
            <h4>Estado: {estado}</h4>
            <img src={imgUrl} alt={nome} />
            <h4 className={styles["nomeProd"]}>{nome}</h4>
            <h4 className={styles["precoProd"]}>R$ {preco.toFixed(2).replace('.', ',')}</h4>
        </div>
    );
}