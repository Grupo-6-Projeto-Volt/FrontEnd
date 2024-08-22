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

function CadastroProdutos() {
	let [nome, setNome] = useState("");
	let [categoria, setCategoria] = useState("");
	let [estado, setEstado] = useState("");
	let [preco, setPreco] = useState("");
	let [descricao, setDescricao] = useState("");
	let [desconto, setDesconto] = useState("");

	let [imagens, setImagens] = useState([]);
	let [tags, setTags] = useState([]);
	let [cores, setCores] = useState([]);

	let [aplicarDesconto, setAplicarDesconto] = useState(false);

	const dragItem = useRef(0);
	const draggedOverItem = useRef(0);

	function handleSort() {
		const imagesClone = [...imagens];
		const aux = imagesClone[dragItem.current];
		imagesClone[dragItem.current] = imagesClone[draggedOverItem.current];
		imagesClone[draggedOverItem.current] = aux;
		setImagens(imagesClone);
	}

	function handleSubmit() {
		console.log("Nome:", nome);
		console.log("Categoria:", categoria);
		console.log("Estado:", estado);
		console.log("Preço:", preco);
		console.log("Descrição:", descricao);
		console.log("Desconto:", desconto);
		console.log("Imagens:", imagens);
		console.log("Tags:", tags);
		console.log("Cores:", cores);
		alert("Produto Cadastrado!");
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
										onChange={(e) => setNome(e.target.value)}
									/>
									<InputSelection
										id={"ipt_categoria"}
										tituloCampo={"Categoria"}
										items={[
											"NA",
											"Celular",
											"Computador",
											"Tablet",
											"Acessório",
										]}
										onChange={(e) => setCategoria(e.target.value)}
									/>
									<InputSelection
										id={"ipt_estado"}
										tituloCampo={"Estado do Produto"}
										items={[
											"NA",
											"Novo",
											"Seminovo",
											"Usado",
											"Velho",
											"Outlet",
										]}
										onChange={(e) => setEstado(e.target.value)}
									/>
									<InputText
										tituloCampo={"Preço do Produto"}
										placeholder={"Ex: R$500,00"}
										onChange={(e) => setPreco(e.target.value)}
									/>
									<InputBigText
										tituloCampo={"Descrição do Produto"}
										placeholder={
											"Ex: Descrição técnica e características do produto"
										}
										onChange={(e) => setDescricao(e.target.value)}
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
									<div
										className={styles["image-list"]}
										style={{ height: imagens.length > 3 ? "10rem" : "auto" }}
									>
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
									<div
										className={styles["tag-list"]}
										style={{ height: tags.length > 4 ? "5rem" : "auto" }}
									>
										{tags &&
											tags.map((e, key) => (
												<h3 key={key} className={styles["tag-card"]}>
													{e}
													<button
														className={styles["remove-tag-btn"]}
														onClick={() => {
															let newTags = [...tags];
															newTags.splice(key, 1);
															setTags(newTags);
														}}
													>
														x
													</button>
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
									<div
										className={styles["color-list"]}
										style={{ height: cores.length > 14 ? "8rem" : "auto" }}
									>
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
											<input
												type="checkbox"
												onChange={(e) => {
													setAplicarDesconto(e.target.checked);
												}}
											/>
											<span className={styles["slider"]}></span>
										</label>
									</div>
									<div
										className={styles["apply-discount-picker"]}
										style={{ display: aplicarDesconto ? "flex" : "none" }}
									>
										<InputText
											tituloCampo={"Desconto do Produto"}
											placeholder={"%"}
											onChange={(e) => {
												// validates if the value in higher than 0 and lower or equal to 100. Also validates if the value contains a comma and, if it does, replaces it for a dot
												let value = e.target.value.replace(",", ".");
												if (Number(value) >= 0 && Number(value) <= 100) {
													setDesconto(value);
												} else {
													alert(
														"Desconto inválido. Deve ser um número entre 0 e 100."
													);
													setDesconto("");
													e.target.value = "";
													e.target.focus();
												}
											}}
										/>
										<div className={styles["prev-new-values"]}>
											<label htmlFor="">
												Valor original: <b>R${Number(preco).toFixed(2)}</b>
											</label>
											<label htmlFor="">
												Novo valor:{" "}
												<b>
													R$
													{(
														((100 - Number(desconto)) / 100) *
														Number(preco)
													).toFixed(2)}
												</b>
											</label>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className={styles["form-submit-area"]}>
							<button
								className={styles["form-submit-button"]}
								onClick={handleSubmit}
							>
								Postar
							</button>
							<button className={styles["form-submit-button"]}>
								Visualizar Layout
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CadastroProdutos;
