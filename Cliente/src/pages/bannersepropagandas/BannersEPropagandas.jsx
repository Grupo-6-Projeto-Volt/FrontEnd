import Navbar from "../../components/navbar/dashboard/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./BannersEPropagandas.module.css";
import InputFile from "../../components/input/inputfile/InputFile";
import ImageListItem from "../../components/imagelistitem/ImageListItem";
import { useRef, useState } from "react";
import DefaultButton from "../../components/button/defaultbutton/DefaultButton";

function BannersEPropagandas() {
	let [banners, setBanners] = useState([]);
	let [propagandas, setPropagandas] = useState([]);

	const dragItemPropaganda = useRef(0);
	const draggedOverItemPropaganda = useRef(0);

	const dragItemBanner = useRef(0);
	const draggedOverItemBanner = useRef(0);

	function handleSortBanner() {
		const imagesClone = [...banners];
		const aux = imagesClone[dragItemBanner.current];
		imagesClone[dragItemBanner.current] =
			imagesClone[draggedOverItemBanner.current];
		imagesClone[draggedOverItemBanner.current] = aux;
		setBanners(imagesClone);
	}

	function handleSortPropaganda() {
		const imagesClone = [...propagandas];
		const aux = imagesClone[dragItemPropaganda.current];
		imagesClone[dragItemPropaganda.current] =
			imagesClone[draggedOverItemPropaganda.current];
		imagesClone[draggedOverItemPropaganda.current] = aux;
		setPropagandas(imagesClone);
	}

	function handleSubmit() {
		console.log(banners);
		console.log(propagandas);
	}

	return (
		<div className={styles["BannersEPropagandas"]}>
			<Navbar />
			<Sidebar />
			<div className={styles["content"]}>
				<div className={styles["container"]}>
					<div className={styles["col"]}>
						<div className={styles["form-section"]}>
							<span className={styles["section-title"]}>
								Adicionar Imagens do Banner
							</span>
							<div className={styles["section-content"]}>
								<div className={styles["insert-image-form"]}>
									<InputFile
										id={"file_banner"}
										tituloCampo={"Adicione as imagens do banner"}
										textoBotao={"Fazer Upload"}
										multiple={true}
										onChange={(e) => {
											let selectedImages = e.target.files;

											for (let i = 0; i < selectedImages.length; i++) {
												setBanners((banners) => [
													...banners,
													{
														name: selectedImages[i].name,
														url: URL.createObjectURL(selectedImages[i]),
													},
												]);
											}
										}}
									/>
									<div className={styles["image-list"]}>
										{banners &&
											banners.map((e, key) => (
												<ImageListItem
													key={key}
													nomeImagem={e.name}
													imagem={e.url}
													draggable={true}
													onDragStart={() => (dragItemBanner.current = key)}
													onDragEnter={() =>
														(draggedOverItemBanner.current = key)
													}
													onDragEnd={handleSortBanner}
													onDragOver={(e) => e.preventDefault()}
													onDelete={() => {
														let newBanners = [...banners];
														newBanners.splice(key, 1);
														setBanners(newBanners);
													}}
												/>
											))}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={styles["col"]}>
						<div className={styles["form-section"]}>
							<span className={styles["section-title"]}>
								Adicionar Imagens de Promoção
							</span>
							<div className={styles["section-content"]}>
								<div className={styles["insert-image-form"]}>
									<InputFile
										id={"file_propaganda"}
										tituloCampo={"Adicione as imagens das propagandas"}
										textoBotao={"Fazer Upload"}
										multiple={true}
										onChange={(e) => {
											let selectedImages = e.target.files;

											for (let i = 0; i < selectedImages.length; i++) {
												setPropagandas((propagandas) => [
													...propagandas,
													{
														name: selectedImages[i].name,
														url: URL.createObjectURL(selectedImages[i]),
													},
												]);
											}
										}}
									/>
									<div className={styles["image-list"]}>
										{propagandas &&
											propagandas.map((e, key) => (
												<ImageListItem
													key={key}
													nomeImagem={e.name}
													imagem={e.url}
													draggable={true}
													onDragStart={() => (dragItemPropaganda.current = key)}
													onDragEnter={() =>
														(draggedOverItemPropaganda.current = key)
													}
													onDragEnd={handleSortPropaganda}
													onDragOver={(e) => e.preventDefault()}
													onDelete={() => {
														let newPropagandas = [...propagandas];
														newPropagandas.splice(key, 1);
														setPropagandas(newPropagandas);
													}}
												/>
											))}
									</div>
								</div>
							</div>
						</div>
						<div className={styles["form-submit-area"]}>
							<DefaultButton text={"Postar"} onClick={handleSubmit} />
							<DefaultButton text={"Visualizar Layout"} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BannersEPropagandas;
