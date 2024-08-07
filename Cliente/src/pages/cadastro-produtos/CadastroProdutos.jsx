import InputSelection from "../../components/input/inputselection/InputSelection";
import InputBigText from "../../components/input/inputbigtext/InputBigText";
import InputText from "../../components/input/inputtext/InputText";
import Navbar from "../../components/navbar/dashboard/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./CadastroProdutos.module.css";
import InputFile from "../../components/input/inputfile/InputFile";

function CadastroProdutos() {
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
									<InputFile tituloCampo={"Fazer Upload"} />
									<div className={styles["image-list"]}></div>
								</div>
							</div>
						</div>
					</div>
					<div className={styles["col"]}></div>
				</div>
			</div>
		</div>
	);
}

export default CadastroProdutos;
