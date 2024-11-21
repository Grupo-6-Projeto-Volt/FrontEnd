import styles from "./ProductCard.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { clickProd } from "../produtoslist/ProdutosList";
import SpinningCircles from "react-loading-icons/dist/esm/components/spinning-circles";
export const Produto = ({
    id,
    nome,
    estado,
    imgUrl,
    preco = 0,
    desconto
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
    if (desconto) {
        return (<div className={styles["produto"]} onClick={() => { navigateToProduct(id) }}>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                <h4 className={styles['estado']}>{estado}</h4>
                <span style={{ backgroundColor: '#d41f1f85', padding: '2%', borderRadius: '3px', color: '#fff', fontWeight: 'bold' }}>{desconto}%</span>
            </div>
            {imgUrl !== undefined ? <img src={imgUrl} alt={nome} /> : <div className={styles['carregamento']}> <SpinningCircles stroke='#c0c0c0' fill='#d0d0d0' speed={.99} />
            </div>
            }
            <h4 className={styles["nomeProd"]}>{nome}</h4>
            <h5 className={styles['precoSemDesconto']}>R$ {preco.toFixed(2).replace('.', ',')}</h5>
            <h4 className={styles["precoProd"]} style={{ color: '#d41f1f' }}>R$ {(((100 - desconto) / 100) * preco).toFixed(2).replace('.', ',')}</h4>
        </div>);
    } else {
        return (
            <div className={styles["produto"]} onClick={() => { navigateToProduct(id) }}>
                <h4 className={styles['estado']}>{estado}</h4>
                {imgUrl !== undefined ? <img src={imgUrl} alt={nome} /> : <div className={styles['carregamento']}> <SpinningCircles stroke='#c0c0c0' fill='#d0d0d0' speed={.99} />
                </div>
                }
                <h4 className={styles["nomeProd"]}>{nome}</h4>
                <h4 className={styles["precoProd"]}>R$ {preco.toFixed(2).replace('.', ',')}</h4>
            </div>
        );
    }
}