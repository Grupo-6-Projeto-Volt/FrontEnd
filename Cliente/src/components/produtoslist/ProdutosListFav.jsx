import styles from "./ProdutosListFav.module.css"
import {ProdutoFav as Prod1} from "../productcard/ProductCardFav"
import {ProdutoFav as Prod2} from "../productcard/ProductCardFav"
import {ProdutoFav as Prod3} from "../productcard/ProductCardFav"
export default function ListFav(){
    return(
        <>
            <div className={styles["container"]}>
                <Prod1 nome={"Iphone"}
                preco={20.0}
                imgUrl={"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369818"} />
                <Prod2 nome={"Iphone"}
                preco={20.0}
                imgUrl={"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369818"} />
                <Prod2 nome={"Iphone"}
                preco={20.0}
                imgUrl={"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369818"} />
            </div>
        </>
    );
}