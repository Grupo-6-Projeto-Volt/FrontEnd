import InputSelection from "../../components/input/inputselection/InputSelection";
import InputBigText from "../../components/input/inputbigtext/InputBigText";
import InputText from "../../components/input/inputtext/InputText";
import Navbar from "../../components/navbar/dashboard/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./CadastroProdutos.module.css";
import InputFile from "../../components/input/inputfile/InputFile";
import ImageListItem from "../../components/imagelistitem/ImageListItem";
import { useEffect, useRef, useState } from "react";
import InputDatalist from "../../components/input/inputdatalist/InputDatalist";
import InputColor from "../../components/input/inputcolor/InputColor";
import { FaClosedCaptioning, FaX } from "react-icons/fa6";

function CadastroProdutos() {
	let [imagens, setImagens] = useState([]);
	let [tags, setTags] = useState([]);
	let [cores, setCores] = useState([]);

	const dragItem = useRef(0);
	const draggedOverItem = useRef(0);

	function handleSort() {
		const imagesClone = [...imagens];
		const aux = imagesClone[dragItem.current];
		imagesClone[dragItem.current] = imagesClone[draggedOverItem.current];
		imagesClone[draggedOverItem.current] = aux;
		setImagens(imagesClone);
	}

	return (
		<div className={styles["CadastroProdutos"]}>
			<Navbar />
			<Sidebar />
			<div className={styles["content"]}>
				<div className={styles["container"]}>
					<div className={styles["col"]}>
						<div className={styles["form-section"]}>
							<span className={styles["section-title"]}>
								Informações do Produto
							</span>
							<div className={styles["section-content"]}>
								<div className={styles["product-information-form"]}>
									<InputText
										tituloCampo={"Nome Produto"}
										placeholder={"Ex: Iphone 13 Max"}
									/>
									<InputSelection tituloCampo={"Categoria"} />
									<InputSelection tituloCampo={"Estado do Produto"} />
									<InputText
										tituloCampo={"Preço do Produto"}
										placeholder={"Ex: R$500,00"}
									/>
									<InputBigText
										tituloCampo={"Descrição do Produto"}
										placeholder={
											"Ex: Descrição técnica e características do produto"
										}
									/>
								</div>
							</div>
						</div>
						<div className={styles["form-section"]}>
							<span className={styles["section-title"]}>
								Adicionar Imagens do Produto
							</span>
							<div className={styles["section-content"]}>
								<div className={styles["insert-image-form"]}>
									<InputFile
										tituloCampo={"Adicione as imagens do produto"}
										textoBotao={"Fazer Upload"}
										multiple={true}
										onChange={(e) => {
											let selectedImages = e.target.files;

											for (let i = 0; i < selectedImages.length; i++) {
												setImagens((imagens) => [
													...imagens,
													{
														name: selectedImages[i].name,
														url: URL.createObjectURL(selectedImages[i]),
													},
												]);
											}
										}}
									/>
									<div className={styles["image-list"]}>
										{imagens &&
											imagens.map((e, key) => (
												<ImageListItem
													key={key}
													nomeImagem={e.name}
													imagem={e.url}
													draggable={true}
													onDragStart={() => (dragItem.current = key)}
													onDragEnter={() => (draggedOverItem.current = key)}
													onDragEnd={handleSort}
													onDragOver={(e) => e.preventDefault()}
													onDelete={() => {
														let newImages = [...imagens];
														newImages.splice(key, 1);
														setImagens(newImages);
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
							<span className={styles["section-title"]}>Tags</span>
							<div className={styles["section-content"]}>
								<div className={styles["product-tags-form"]}>
									<InputDatalist
										tituloCampo={"Adicionar Tag"}
										onClick={() => {
											let item = document.getElementById("inputList");
											let valor = item.value;

											if (valor.trim() && valor.length > 3) {
												if (!tags.includes(valor)) {
													setTags((tags) => [...tags, valor]);
												} else {
													alert("Tag já existente");
												}
											} else {
												alert("Tag inválida. Deve ter pelo menos 4 caracteres");
											}

											item.value = "";
										}}
									/>
									<div className={styles["tag-list"]}>
										{tags &&
											tags.map((e, key) => (
												<h3 key={key} className={styles["tag-card"]}>
													{e}
												</h3>
											))}
									</div>
								</div>
							</div>
						</div>
						<div className={styles["form-section"]}>
							<span className={styles["section-title"]}>Cores</span>
							<div className={styles["section-content"]}>
								<div className={styles["product-color-form"]}>
									<InputColor
										tituloCampo={
											"Escolha as cores disponíveis para este produto"
										}
										onClick={() => {
											let item = document.getElementById("color");
											let valor = item.value;
											setCores((cores) => [...cores, valor]);
										}}
										onChange={() => {
											let item = document.getElementById("color");
											let valor = item.value;
											setCores((cores) => [...cores.slice(0, -1), valor]);
										}}
									/>
									<div className={styles["color-list"]}>
										{cores &&
											cores.map((e, key) => (
												<div
													key={key}
													style={{ backgroundColor: e }}
													className={styles["color-card"]}
												>
													<button
														className={styles["remove-color-btn"]}
														onClick={() => {
															let newCores = [...cores];
															newCores.splice(key, 1);
															setCores(newCores);
														}}
													>
														x
													</button>
												</div>
											))}
									</div>
								</div>
							</div>
						</div>
						<div className={styles["form-section"]}>
							<span className={styles["section-title"]}>Desconto</span>
							<div className={styles["section-content"]}>
								<div className={styles["discount-form"]}>
									<div className={styles["apply-discount-slider"]}>
										<label htmlFor="nome">Aplicar Desconto?</label>
										<label className={styles["switch"]}>
											<input type="checkbox" />
											<span className={styles["slider"]}></span>
										</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CadastroProdutos;
