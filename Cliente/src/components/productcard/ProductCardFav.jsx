import styles from "./ProductCard.module.css"
import { FaHeart } from "react-icons/fa";
import { favoritos } from "../../model/favoritosModel";
export const ProdutoFav = ({
    id,
    nome,
    imgUrl,
    preco = 0,
    desconto
}) => {
    if (desconto) {
        return (
            <div className={styles["produto"]}>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <span style={{ backgroundColor: '#d41f1f85', padding: '2%', borderRadius: '3px', color: '#fff', fontWeight: 'bold' }}>{desconto}%</span>
                    <FaHeart onClick={() => { favoritos.desfavoritar(id); }} className={styles["heart"]} />
                </div>
                <img src={imgUrl} alt={nome} />
                <h4 className={styles["nomeProd"]}>{nome}</h4>
                <h5 className={styles['precoSemDesconto']}>R$ {preco.toFixed(2).replace('.', ',')}</h5>
                <h4 className={styles["precoProd"]} style={{ color: '#d41f1f' }}>R$ {(((100 - desconto) / 100) * preco).toFixed(2).replace('.', ',')}</h4>
            </div>
        );
    } else {
        return (
            <div className={styles["produto"]}>
                <FaHeart onClick={() => { favoritos.desfavoritar(id); }} className={styles["heart"]} />
                <img src={imgUrl} alt={nome} />
                <h4 className={styles["nomeProd"]}>{nome}</h4>
                <h4 className={styles["precoProd"]}>R$ {preco.toFixed(2).replace('.', ',')}</h4>
            </div>
        );
    }
}