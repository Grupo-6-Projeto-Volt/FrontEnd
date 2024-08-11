import { FaTrash } from "react-icons/fa6";
import styles from "./ImageListItem.module.css";

function ImageListItem({ nomeImagem, imagem }) {
	return (
		<div className={styles["ImageListItem"]}>
			<div className={styles["item-content"]}>
				<span className={styles["item-title"]}>Imagem enviada!</span>
				<span>Imagem {nomeImagem} adicionada com sucesso!</span>
			</div>
			<div className={styles["item-image"]}>
				<img src={imagem} alt={nomeImagem} />
			</div>
			<div className={styles["item-delete-icon"]}>
				<FaTrash />
			</div>
		</div>
	);
}

export default ImageListItem;
