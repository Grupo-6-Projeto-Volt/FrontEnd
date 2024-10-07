import styles from "./ProductCard.module.css"
import { FaHeart } from "react-icons/fa";
import { favoritos } from "../../model/favoritosModel";
export const ProdutoFav = ({
    id,
    nome,
    imgUrl,
    preco = 0
}) => {
    return (
        <div className={styles["produto"]}>
            <FaHeart onClick={() => {favoritos.desfavoritar(id); }} className={styles["heart"]}/>
            <img src={imgUrl} alt={nome} />
            <h4 className={styles["nomeProd"]}>{nome}</h4>
            <h4 className={styles["precoProd"]}>R$ {preco.toFixed(2).replace('.', ',')}</h4>
        </div>
    );
}