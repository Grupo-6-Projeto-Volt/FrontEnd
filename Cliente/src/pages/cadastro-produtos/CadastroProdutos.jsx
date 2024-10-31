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
import { toast } from "react-toastify";
import LoadingBar from "../../components/loadingbar/LoadingBar";
import { Box, Button, Modal } from "@mui/material";
import ProductPage from "../productpage/ProductPage";
import { validateAuth } from "../../utils/global";

function CadastroProdutos() {
	const loadBarRef = useRef();
	const { id } = useParams();
	const navigate = useNavigate();
	const dragItem = useRef(0);
	const draggedOverItem = useRef(0);
	const [nome, setNome] = useState("");
	const [preco, setPreco] = useState("");
	const [categoria, setCategoria] = useState("");
	const [estado, setEstado] = useState("");
	const [descricao, setDescricao] = useState("");
	const [desconto, setDesconto] = useState("");
	const [dataInicioDesconto, setDataInicioDesconto] = useState("");
	const [dataFimDesconto, setDataFimDesconto] = useState("");
	const [imagens, setImagens] = useState([]);
	const [tag, setTag] = useState("");
	const [tags, setTags] = useState([]);
	const [cor, setCor] = useState("");
	const [cores, setCores] = useState([]);
	const [aplicarDesconto, setAplicarDesconto] = useState(false);
	const [editModeOn, setEditModeOn] = useState(id !== undefined);
	const [categorias, setCategorias] = useState([]);
	const [allTags, setAllTags] = useState([]);
	const [open, setOpen] = useState(false);
	const [produto, setProduto] = useState({});

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		overflow: "auto",
		transform: "translate(-50%, -50%)",
		width: "95vw",
		height: "95vh",
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};

	const buttonFecharModel = () => setOpen(false);

	function showProgressBar() {
		if (loadBarRef.current) {
			loadBarRef.current.show();
		}
	}

	function hideProgressBar() {
		if (loadBarRef.current) {
			loadBarRef.current.hide();
		}
	}

	function validateAuthentication() {
		if (!validateAuth() || sessionStorage.CATEGORIA !== "1") {
			navigate("/login");
		}
	}

	function handleSort() {
		let imagesClone = [...imagens];
		let aux = imagesClone[dragItem.current];
		imagesClone[dragItem.current] = imagesClone[draggedOverItem.current];
		imagesClone[draggedOverItem.current] = aux;
		setImagens(imagesClone);
	}

	function clear() {
		setNome("");
		setCategoria("");
		setEstado("");
		setPreco("");
		setDescricao("");
		setDesconto("");
		setDataInicioDesconto("");
		setDataFimDesconto("");
		setTag("");
		setCor("");
		setCores("");
		setImagens([]);
		setTags([]);
		setCores([]);
		setAplicarDesconto(false);
	}

	async function handleSubmit() {
		await operacao();
	}

	async function operacao() {
		let modo = {
			sucesso: editModeOn ? "editado" : "cadastrado",
			erro: editModeOn ? "editar" : "cadastrar",
		};

		try {
			showProgressBar();

			let produtoCriado;

			let categoriaEncontrada = await categoriasModel.buscarCategoriaPorNome(
				categoria
			);

			if (editModeOn) {
				await desassociarProduto(id);
				produtoCriado = await produtosModel.alterarProduto(
					id,
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
			} else {
				produtoCriado = await produtosModel
					.adicionarProduto(
						nome,
						descricao,
						preco,
						1,
						estado,
						desconto,
						dataInicioDesconto,
						dataFimDesconto,
						categoriaEncontrada.id
					)
					.then((result) => {
						return result;
					})
					.catch((error) => {
						console.error(error);
						return null;
					});
			}
			console.log(id);
			await cadastrarTags(produtoCriado.id);
			await cadastrarCores(produtoCriado.id);
			await cadastrarImagens(produtoCriado.id);

			hideProgressBar();

			toast.success(`Produto ${modo.sucesso} com sucesso!`);

			if (!editModeOn) clear();
		} catch (error) {
			hideProgressBar();
			toast.error(
				`Ocorreu um erro ao ${modo.erro} o produto: ${error.message}`
			);
			console.error(error);
		}
	}

	async function cadastrarTags(idProduto) {
		tags.forEach(async (tag) => {
			await tagsModel.inserirTag(tag);

			const tagEncontrada = await tagsModel.buscarTagPorNome(tag);

			await classificacaoProdutosModel
				.associarTagProduto(idProduto, tagEncontrada.id)
				.then((result) => {
					return result;
				})
				.catch((error) => {
					console.error(error);
					toast.error(`Erro ao cadastrar tags: ${error}`);
					return null;
				});

			getTags();
		});
	}

	async function cadastrarCores(idProduto) {
		cores.forEach(async (cor) => {
			await corProdutosModel
				.associarCorProduto(cor.nome, cor.hexId, idProduto)
				.then((result) => {
					return result;
				})
				.catch((error) => {
					console.error(error);
					toast.error(`Erro ao cadastrar cores: ${error}`);
					return null;
				});
		});
	}

	function fileToBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = reject;
		});
	}

	async function cadastrarImagens(idProduto) {
		for (let i = 0; i < imagens.length; i++) {
			let base64 = await fileToBase64(imagens[i].codigoImagem);
			await imagemProdutosModel
				.associarImagemProduto(
					`images/Produtos/Produto${idProduto}/${imagens[i].nome}`,
					base64,
					i,
					idProduto
				)
				.then((result) => {
					return result;
				})
				.catch((error) => {
					console.error(error);
					toast.error(`Erro ao cadastrar imagens: ${error}`);
					return null;
				});
		}
	}

	async function desassociarProduto(id) {
		await imagemProdutosModel.desassociarImagemProduto(id);
		await classificacaoProdutosModel.desassociarTagProduto(id);
		await corProdutosModel.desassociarCorProduto(id);
	}

	async function getProduto() {
		const produto = await produtosModel.buscarProdutoPorId(id);

		setNome(produto.nome);
		setPreco(produto.preco);
		setCategoria(produto.categoria);
		setEstado(produto.estadoGeral);
		setDescricao(produto.descricao);
		setAplicarDesconto(produto.desconto > 0 ? true : false);
		setDesconto(produto.desconto);
		setDataInicioDesconto(produto.dataInicioDesconto);
		setDataFimDesconto(produto.dataFimDesconto);

		let listaImagens = [];
		for (let i = 0; i < produto.imagensProduto.length; i++) {
			const file = new File(
				[
					await fetch(produto.imagensProduto[i].codigoImagem).then((res) =>
						res.blob()
					),
				],
				produto.imagensProduto[i].nome
			);
			produto.imagensProduto[i].codigoImagem = file;

			listaImagens.push({
				nome: String(produto.imagensProduto[i].nome).replace(
					`images/Produtos/Produto${id}/`,
					""
				),
				codigoImagem: produto.imagensProduto[i].codigoImagem,
			});
		}

		let listaTagsProduto = [];
		produto.tagsProduto.forEach((item) => {
			listaTagsProduto.push(item.tag);
		});

		let listaCores = [];
		produto.coresProduto.forEach((item) => {
			listaCores.push({
				nome: item.nome,
				hexId: item.hexId,
			});
		});

		setAplicarDesconto(produto.desconto > 0 ? true : false);
		setTags(listaTagsProduto);
		setImagens(listaImagens);
		setCores(listaCores);
	}

	async function getTags() {
		let response = await tagsModel.listarTags();
		let listaTodasTags = [];
		response.forEach((item) => {
			listaTodasTags.push(item.tag);
		});
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
		toast.success("Produto deletado com sucesso!");
		navigate("/listagem-produtos");
	}

	useEffect(() => {
		validateAuthentication();
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
			<LoadingBar ref={loadBarRef} showPercentage={false} />
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
										value={nome}
										placeholder={"Ex: Iphone 13 Max"}
										onChange={(e) => setNome(e.target.value)}
									/>
									<InputSelection
										id={"ipt_categoria"}
										tituloCampo={"Categoria"}
										value={categoria}
										items={categorias}
										onChange={(e) => setCategoria(e.target.value)}
									/>
									<InputSelection
										id={"ipt_estado"}
										tituloCampo={"Estado do Produto"}
										value={estado}
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
										value={preco}
										placeholder={"Ex: R$500,00"}
										onChange={(e) => setPreco(e.target.value)}
									/>
									<InputBigText
										id={"ipt_desc"}
										tituloCampo={"Descrição do Produto"}
										value={descricao}
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
														nome: selectedImages[i].name,
														codigoImagem: selectedImages[i],
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
													nomeImagem={e.nome}
													imagem={
														typeof e.codigoImagem === "string"
															? e.codigoImagem
															: URL.createObjectURL(e.codigoImagem)
													}
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
										value={tag}
										values={allTags}
										onClick={() => {
											if (tag.trim() && tag.length > 3) {
												if (!tags.includes(tag)) {
													setTags((tags) => [...tags, tag]);
													setTag("");
												} else {
													toast.error("Tag já existente");
												}
											} else {
												toast.error(
													"Tag inválida. Deve ter pelo menos 4 caracteres"
												);
											}
										}}
										onChange={(e) => setTag(e.target.value)}
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
										onClick={(e) => {
											setCor(e.target.value);
											setCores((cores) => [
												...cores,
												{ nome: cor, hexId: cor },
											]);
										}}
										onChange={(e) => {
											setCor(e.target.value);
											setCores((cores) => [
												...cores.slice(0, -1),
												{ nome: cor, hexId: cor },
											]);
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
													style={{ backgroundColor: e.hexId }}
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
												checked={aplicarDesconto}
												type="checkbox"
												onChange={(e) => {
													setAplicarDesconto(e.target.checked);
													if (!aplicarDesconto) {
														setDesconto("");
														setDataInicioDesconto("");
														setDataFimDesconto("");
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
											value={desconto}
											placeholder={"%"}
											onChange={(e) => {
												let value = e.target.value.replace(",", ".");
												if (Number(value) >= 0 && Number(value) <= 100) {
													setDesconto(value);
												} else {
													toast.error(
														"Desconto inválido. Deve ser um número entre 0 e 100."
													);
													setDesconto("");
													e.target.focus();
												}
											}}
										/>
										<InputDate
											id={"ipt_data_inicio_desconto"}
											tituloCampo={"Data de Início do Desconto"}
											value={dataInicioDesconto}
											onChange={(e) => setDataInicioDesconto(e.target.value)}
											onBlur={() => {
												if (
													dataInicioDesconto &&
													dataInicioDesconto <
														new Date().toISOString().split("T")[0]
												) {
													toast.error(
														"Data de Início do Desconto inválida. Deve ser posterior à data atual."
													);
													setDataInicioDesconto("");
												}
											}}
										/>
										<InputDate
											id={"ipt_data_fim_desconto"}
											tituloCampo={"Data de Fim do Desconto"}
											value={dataFimDesconto}
											onChange={(e) => setDataFimDesconto(e.target.value)}
											onBlur={() => {
												if (
													dataFimDesconto &&
													dataFimDesconto < dataInicioDesconto
												) {
													toast.error(
														"Data de Fim do Desconto inválida. Deve ser posterior à Data de Início do Desconto."
													);
													setDataFimDesconto("");
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
							<DefaultButton
								text={"Visualizar Layout"}
								onClick={() => {
									setProduto({
										nome: nome,
										descricao: descricao,
										preco: Number(preco.replace("R$", "")),
										categoria: categoria,
										estadoGeral: estado,
										desconto: desconto,
										dataInicioDesconto: dataInicioDesconto,
										dataFimDesconto: dataFimDesconto,
										cores: cores,
										tags: tags,
										imagensProduto: imagens,
									});
									setOpen(true);
								}}
							/>
						</div>
						<div
							className={styles["form-submit-area"]}
							style={{ display: editModeOn ? "flex" : "none" }}
						>
							<DefaultButton text={"Atualizar"} onClick={handleSubmit} />
							<DefaultButton
								text={"Visualizar Layout"}
								onClick={() => {
									setProduto({
										nome: nome,
										descricao: descricao,
										preco: Number(String(preco).replace("R$", "")),
										categoria: categoria,
										estadoGeral: estado,
										desconto: desconto,
										dataInicioDesconto: dataInicioDesconto,
										dataFimDesconto: dataFimDesconto,
										cores: cores,
										tags: tags,
										imagensProduto: imagens,
									});
									setOpen(true);
								}}
							/>
							<button
								className={styles["Delete-btn"]}
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
							position: "absolute",
							top: "10px",
							right: "10px",
							background: "none",
							border: "none",
							fontSize: "50px",
							cursor: "pointer",
						}}
					>
						&times;
					</Button>
					<div className={styles["product"]}>
						<ProductPage produtoExemplo={produto} />
					</div>
				</Box>
			</Modal>
		</div>
	);
}

export default CadastroProdutos;
