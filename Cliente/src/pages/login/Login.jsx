import { useState } from "react";
import styles from "./Login.module.css";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import logo from "../../utils/assets/logo-ichiban.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavBarPadrao } from "../../components/navBarHome/NavBar";
import Footer from "../../components/footer/Footer.jsx";

function Login() {
	let [emailText, setEmailText] = useState("");
	let [passwordText, setPasswordText] = useState("");
	const navigate = useNavigate();
	let categoria;
	function handleSubmit() {
		api
			.post("/login", {
				email: emailText,
				senha: passwordText,
			})
			.then((resultado) => {
				const Data = resultado.data;
				sessionStorage.TOKEN = Data.token;
				sessionStorage.ID = Data.userId;
				sessionStorage.NOME = Data.nome;
				sessionStorage.EMAIL = Data.email;
				sessionStorage.TELEFONE = Data.telefone;
				sessionStorage.ID_USER = Data.idUsuario;
				sessionStorage.CATEGORIA = Data.categoria;
				toast.success("Login realizado com sucesso!!", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
				// console.log(sessionStorage.getItem('ID_USER'))
				if(categoria === 1){
					navigate("/dashboard-chamados");
				}else{
					navigate("/");
				}
				// console.log(Data)
			})
			.catch((erro) => {
				console.error("Houve um erro: " + erro);
				toast.error("Email ou senha inválidos!!");
			});
	}

	return (
		<>
			<NavBarPadrao />
			<ToastContainer />
			<div className={styles["Login"]}>
				<div className={styles["form"]}>
					<div className={styles["voltar"]}>
						<p
							onClick={() => {
								navigate("/");
							}}
						>
							Voltar
						</p>
					</div>
					<h1 className={styles["titulo"]}>
						<b>Entrar</b>
					</h1>
					<div className={styles["input-group"]}>
						<div className={styles["input-box"]}>
							<label>Email:</label>
							<input
								onChange={(evento) => {
									setEmailText(evento.target.value);
								}}
								placeholder="Exemplo@gmail.com"
								type="email"
							></input>
						</div>
						<div className={styles["input-box"]}>
							<label>Senha:</label>
							<input
								onChange={(evento) => {
									setPasswordText(evento.target.value);
								}}
								placeholder="*******"
								type="password"
							></input>
							<p className={styles["redefinir-senha"]}>Esqueceu a senha?</p>
						</div>
						<button onClick={handleSubmit} className={styles["btn"]}>
							Entrar
						</button>
					</div>
					<div className={styles["box-cadastar"]}>
						<div>
							<p className={styles["cadastrar"]}>Não possui conta ainda?   </p>
						</div>
						<div>
							<a
								className="link"
								onClick={() => {
									navigate("/cadastro");
								}}
							>
								Cadastre-se agora
							</a>
						</div>
					</div>
				</div>
				<div></div>
			</div>
			<Footer />
		</>
	);
}

export default Login;
