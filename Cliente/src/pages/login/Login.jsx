import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api";
import logo from "../../utils/assets/logo-ichiban.png";
import styles from "./Login.module.css";

function Login() {
	let [emailText, setEmailText] = useState("");
	let [passwordText, setPasswordText] = useState("");
	const navigate = useNavigate();

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
				navigate("/dashboard-chamados");
			})
			.catch((erro) => {
				console.error("Houve um erro: " + erro);
				toast.error("Email ou senha inválidos!!");
			});
	}

	return (
		<>
			<ToastContainer />
			<div className={styles["Login"]}>
				<div className={styles["box-logo"]}>
					<img src={logo} alt="logo ichiban" className={styles["logo"]}></img>
				</div>
				<div className={styles["form"]}>
					<div className={styles["voltar"]}>
						<p
							onClick={() => {
								navigate("/pagina");
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
							<label>E-mail:</label>
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
							<p>Não possui conta ainda?   </p>
						</div>
						<div>
							<a
								className="link"
								onClick={() => {
									navigate("/cadastro");
								}}
								href="/cadastro"
							>
								Cadastre-se agora
							</a>
						</div>
					</div>
				</div>
				<div></div>
			</div>
		</>
	);
}

export default Login;
