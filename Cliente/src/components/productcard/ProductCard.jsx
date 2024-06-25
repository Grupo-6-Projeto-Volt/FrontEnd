import styles from "./ProductCard.module.css"
export const Produto = ({
    nome,
    estado,
    imgUrl,
    preco
}) => {
    return(
        <div className={styles["produto"]}>
            <h4>Estado: {estado}</h4>
            <img src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6341/6341343_sd.jpg" alt="" />
        </div>
    );
}