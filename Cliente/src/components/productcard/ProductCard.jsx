import styles from "./ProductCard.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { clickProd } from "../produtoslist/ProdutosList";

export const Produto = ({
    id,
    nome,
    estado,
    imgUrl,
    preco = 0
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const navigateToProduct = (idProduto) => {
        if (location.pathname === `/productpage`) {
            navigate(`/productpage`);
            localStorage.setItem("idProduto", idProduto);
            window.location.reload()
        } else {
            navigate(`/productpage`);
            localStorage.setItem("idProduto", idProduto);
        }
        clickProd.adicionaClick();
    };
    return (
        <div className={styles["produto"]} onClick={() => { navigateToProduct(id) }}>
            <h4 className={styles['estado']}>{estado}</h4>
            <img src={imgUrl} alt={nome} />
            <h4 className={styles["nomeProd"]}>{nome}</h4>
            <h4 className={styles["precoProd"]}>R$ {preco.toFixed(2).replace('.', ',')}</h4>
        </div>
    );
}