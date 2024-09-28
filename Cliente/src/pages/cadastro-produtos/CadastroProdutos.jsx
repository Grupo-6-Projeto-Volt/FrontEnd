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
import InputDate from "../../components/input/inputdate/InputDate";
import DefaultButton from "../../components/button/defaultbutton/DefaultButton";
import { useNavigate, useParams } from "react-router-dom";
import { produtosModel } from "../../model/produtosModel";
import { categoriasModel } from "../../model/categoriasModel";
import { tagsModel } from "../../model/tagsModel";
import { classificacaoProdutosModel } from "../../model/classificacaoProdutosModel";
import { imagemProdutosModel } from "../../model/imagemProdutosModel";
import { corProdutosModel } from "../../model/corProdutosModel copy";

function CadastroProdutos() {
	let [nome, setNome] = useState("");
	let [categoria, setCategoria] = useState("");
	let [estado, setEstado] = useState("");
	let [preco, setPreco] = useState("");
	let [descricao, setDescricao] = useState("");
	let [desconto, setDesconto] = useState("");

	let [dataInicioDesconto, setDataInicioDesconto] = useState("");
	let [dataFimDesconto, setDataFimDesconto] = useState("");

	let [imagens, setImagens] = useState([]);
	let [tags, setTags] = useState([]);
	let [cores, setCores] = useState([]);

	let [aplicarDesconto, setAplicarDesconto] = useState(false);

	const { id } = useParams();
	let navigate = useNavigate();

	let [editModeOn, setEditModeOn] = useState(id !== undefined);
	let [produto, setProduto] = useState(null);
	let [categorias, setCategorias] = useState([]);
	let [allTags, setAllTags] = useState([]);

	const dragItem = useRef(0);
	const draggedOverItem = useRef(0);

	function handleSort() {
		const imagesClone = [...imagens];
		const aux = imagesClone[dragItem.current];
		imagesClone[dragItem.current] = imagesClone[draggedOverItem.current];
		imagesClone[draggedOverItem.current] = aux;
		setImagens(imagesClone);
	}

	async function handleSubmit() {
		console.log("Nome:", nome);
		console.log("Categoria:", categoria);
		console.log("Estado:", estado);
		console.log("Preço:", preco);
		console.log("Descrição:", descricao);
		console.log("Desconto:", desconto);
		console.log("Data Início Desconto:", dataInicioDesconto);
		console.log("Data Fim Desconto:", dataFimDesconto);
		console.log("Imagens:", imagens);
		console.log("Tags:", tags);
		console.log("Cores:", cores);
		alert("Produto Cadastrado!");

		let categoriaEncontrada = await categoriasModel.buscarCategoriasPorNome(
			categoria
		);

		let produtoCriado = await produtosModel.adicionarProduto(
			nome,
			descricao,
			preco,
			1,
			estado,
			desconto,
			dataInicioDesconto,
			dataFimDesconto,
			categoriaEncontrada.id
		);

		let tagsEncontradas = [];

		tags.forEach(async (tag) => {
			let tagEncontrada = await tagsModel.buscarTagPorNome(tag);
			if (!tagEncontrada) {
				tagEncontrada = await tagsModel.inserirTag(tag);
			}
			tagsEncontradas.push(tagEncontrada);
		});

		tagsEncontradas.forEach(async (tag) => {
			await classificacaoProdutosModel.associarTagProduto(
				produtoCriado.id,
				tag.id
			);
		});

		cores.forEach(async (cor) => {
			await corProdutosModel.associarCorProduto(
				cor.nome,
				cor.hexId,
				produtoCriado.id
			);
		});

		for (let i = 0; i < imagens.length; i++) {
			await imagemProdutosModel.associarImagemProduto(
				imagens[i].nome,
				imagens[i].codigoImagem,
				i,
				produtoCriado.id
			);
		}
	}

	async function getProduto() {
		let produto = await produtosModel.buscarProdutoPorId(id);
		console.log(produto);

		setNome(produto.nome);
		setPreco(produto.preco);
		setCategoria(produto.categoria);
		setEstado(produto.estadoGeral);
		setDescricao(produto.descricao);
		setAplicarDesconto(produto.desconto === 0 ? false : true);
		setDesconto(produto.desconto);
		setDataInicioDesconto(produto.dataInicioDesconto);
		setDataFimDesconto(produto.dataFimDesconto);

		document.getElementById("ipt_nome").value = produto.nome;
		document.getElementById("ipt_preco").value = `R$${Number(
			produto.preco
		).toFixed(2)}`;
		document.getElementById("ipt_categoria").value = produto.categoria;
		document.getElementById("ipt_estado").value = produto.estadoGeral;
		document.getElementById("ipt_desc").value = produto.descricao;

		document.getElementById("ipt_check_discount").checked =
			produto.desconto === 0 ? false : true;

		document.getElementById("ipt_vlr_desconto").value = `${produto.desconto}%`;
		document.getElementById("ipt_data_inicio_desconto").value =
			produto.dataInicioDesconto;
		document.getElementById("ipt_data_fim_desconto").value =
			produto.dataFimDesconto;

		let listaImagens = [];
		for (let i = 0; i < produto.imagensProduto.length; i++) {
			listaImagens.push({
				name: produto.imagensProduto[i].nome,
				url: produto.imagensProduto[i].codigoImagem,
			});
		}

		let listaTagsProduto = [];
		produto.tagsProduto.forEach((item) => {
			listaTagsProduto.push(item.tag);
		});

		let listaCores = [];
		produto.coresProduto.forEach((item) => {
			listaCores.push(item.hexId);
		});

		setAplicarDesconto(produto.desconto === 0 ? false : true);
		setTags(listaTagsProduto);
		setImagens(listaImagens);
		setCores(listaCores);
		setProduto(produto);
	}

	async function getTags() {
		let response = await tagsModel.listarTags();
		let listaTodasTags = [];
		response.arr.forEach((item) => {
			listaTodasTags.push(item.tag);
		});
		console.log(listaTodasTags);
		setAllTags(listaTodasTags);
	}

	async function getCategorias() {
		let response = await categoriasModel.listarCategorias();
		let lista = ["NA"];
		response.forEach((item) => {
			lista.push(item.nome);
		});
		setCategorias(lista);
	}

	async function handleDelete(id) {
		await produtosModel.deletarProduto(id);
		alert("Produto deletado com sucesso!");
		navigate("/listagem-produtos");
	}

	useEffect(() => {
		if (editModeOn) {
			getProduto();
		}
		getCategorias();
		getTags();
	}, []);

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
										id={"ipt_nome"}
										tituloCampo={"Nome Produto"}
										placeholder={"Ex: Iphone 13 Max"}
										onChange={(e) => setNome(e.target.value)}
									/>
									<InputSelection
										id={"ipt_categoria"}
										tituloCampo={"Categoria"}
										items={categorias}
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
										id={"ipt_preco"}
										tituloCampo={"Preço do Produto"}
										placeholder={"Ex: R$500,00"}
										onChange={(e) => setPreco(e.target.value)}
									/>
									<InputBigText
										id={"ipt_desc"}
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
										values={allTags}
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
												id="ipt_check_discount"
												type="checkbox"
												onChange={(e) => {
													setAplicarDesconto(e.target.checked);
													if (!aplicarDesconto) {
														setDesconto("");
														setDataInicioDesconto("");
														setDataFimDesconto("");

														document.getElementById("ipt_vlr_desconto").value =
															"";

														document.getElementById(
															"ipt_data_inicio_desconto"
														).value = "";

														document.getElementById(
															"ipt_data_fim_desconto"
														).value = "";
													}
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
											id={"ipt_vlr_desconto"}
											tituloCampo={"Desconto do Produto"}
											placeholder={"%"}
											onChange={(e) => {
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
										<InputDate
											id={"ipt_data_inicio_desconto"}
											tituloCampo={"Data de Início do Desconto"}
											onChange={(e) => setDataInicioDesconto(e.target.value)}
											onBlur={() => {
												if (
													dataInicioDesconto &&
													dataInicioDesconto <
														new Date().toISOString().split("T")[0]
												) {
													alert(
														"Data de Início do Desconto inválida. Deve ser posterior à data atual."
													);
													setDataInicioDesconto("");

													document.getElementById(
														"ipt_data_inicio_desconto"
													).value = "";
												}
											}}
										/>
										<InputDate
											id={"ipt_data_fim_desconto"}
											tituloCampo={"Data de Fim do Desconto"}
											onChange={(e) => setDataFimDesconto(e.target.value)}
											onBlur={() => {
												if (
													dataFimDesconto &&
													dataFimDesconto < dataInicioDesconto
												) {
													alert(
														"Data de Fim do Desconto inválida. Deve ser posterior à Data de Início do Desconto."
													);
													setDataFimDesconto("");
													document.getElementById(
														"ipt_data_fim_desconto"
													).value = "";
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
						<div
							className={styles["form-submit-area"]}
							style={{ display: editModeOn ? "none" : "flex" }}
						>
							<DefaultButton text={"Postar"} onClick={handleSubmit} />
							<DefaultButton text={"Visualizar Layout"} />
						</div>
						<div
							className={styles["form-submit-area"]}
							style={{ display: editModeOn ? "flex" : "none" }}
						>
							<DefaultButton text={"Atualizar"} onClick={handleSubmit} />
							<DefaultButton text={"Visualizar Layout"} />
							<button
								className={styles["delete-btn"]}
								onClick={() => {
									handleDelete(id);
								}}
							>
								Excluir
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CadastroProdutos;
