import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useRef, useState, useReducer, useEffect } from "react";
import DefaultButton from "../../components/button/defaultbutton/DefaultButton";
import ImageListItem from "../../components/imagelistitem/ImageListItem";
import InputFile from "../../components/input/inputfile/InputFile";
import Navbar from "../../components/navbar/dashboard/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { banner } from "../../model/bannerModel";
import Home from '../home/Home';
import styles from "./BannersEPropagandas.module.css";



function BannersEPropagandas() {
	let [banners, setBanners] = useState([]);
	let [propagandas, setPropagandas] = useState([]);
	let [open, setOpen] = useState(false);

	const dragItemPropaganda = useRef(0);
	const draggedOverItemPropaganda = useRef(0);

	const dragItemBanner = useRef(0);
	const draggedOverItemBanner = useRef(0);

	const render = () => { setBanners() }
	const [favAtualizar, forceRender] = useReducer(render, []);

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		overflow: 'auto',
		transform: 'translate(-50%, -50%)',
		width: '700px',
		height: '600px',
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	};

	const buttonFecharModel = () => setOpen(false);

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
		banner.postBanner(banners[0], banners[0].type);
	}

	useEffect(() => {

	}, []);

	return (
		<div className={styles["BannersEPropagandas"]}>
			<Navbar />
			<Sidebar />
			<div className={styles["content"]}>
				<div className={styles["container"]}>
					<div className={styles["col"]}>
						<div className={styles["form-section"]}>
							<span className={styles["section-title"]}>
								Adicionar Imagem do Banner
							</span>
							<div className={styles["section-content"]}>
								<div className={styles["insert-image-form"]}>
									<InputFile
										id={"file_banner"}
										tituloCampo={"Adicione a imagem do banner"}
										textoBotao={"Fazer Upload"}
										multiple={false}
										onChange={(e) => {
											let selectedImages = e.target.files;
											const imgs = [];
											for (let i = 0; i < selectedImages.length; i++) {
												selectedImages[i].url = URL.createObjectURL(selectedImages[i])
												imgs.push(selectedImages[i]);
												setBanners(imgs)
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
								Adicionar Imagem de Promoção
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
							<DefaultButton text={"Visualizar Layout"} onClick={() => {
								setOpen(true)
							}} />
						</div>
					</div>
				</div>
			</div>
			<Modal
				open={open}
				onClose={buttonFecharModel}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Button
						onClick={buttonFecharModel}
						style={{
							position: 'absolute',
							top: '10px',
							right: '10px',
							background: 'none',
							border: 'none',
							fontSize: '18px',
							cursor: 'pointer',
						}}
					>
						&times;
					</Button>
					<div className={styles["home"]}>
						<Home />
					</div>
				</Box>
			</Modal>
		</div>
	);
}

export default BannersEPropagandas;
