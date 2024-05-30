import React, { useState } from "react";
import "./Cadastro.css";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import logo from "../../utils/assets/logo-ichiban.png";

const Cadastro = () => {
  const [nomeText, setNomeText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [telefoneText, setTelefoneText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (values) => {
    api
      .post("/usuarios", {
        nome: values.nome,
        email: values.email,
        telefone: values.telefone,
        categoria: 1,
        senha: values.password,
      })
      .then((resultado) => {
        const Data = resultado.data;
        sessionStorage.TOKEN = Data.token;
        sessionStorage.ID = Data.userId;
        sessionStorage.NOME = Data.nome;
        sessionStorage.EMAIL = Data.email;
        sessionStorage.TELEFONE = Data.telefone;
        sessionStorage.CATEGORIA = Data.categoria;
        alert("Cadastro feito com sucesso!!");
        navigate("/pagina");
      })
      .catch((erro) => {
        console.error("Houve um erro: " + erro);
        alert("Informações incorretas!!");
      });
  };

  const validationsRegister = yup.object().shape({
    nome: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("Email inválido").required("O email é obrigatório"),
    telefone: yup.string().required("Telefone é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("A senha é obrigatória"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas são diferentes")
      .required("A confirmação da senha é obrigatória"),
  });

  return (
    <div className="Cadastro">
      <div className="box-logo">
        <img src={logo} className="logo" alt="Logo" />
      </div>
      <Formik
        initialValues={{
          nome: "",
          email: "",
          telefone: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={handleRegister}
        validationSchema={validationsRegister}
      >
        <Form className="form">
          <div className="voltar">
            <p
              onClick={() => {
                navigate("/login");
              }}
            >
              Voltar
            </p>
          </div>
          <h1 className="titulo">Cadastrar</h1>
          <div className="input-group">
            <div className="input-box">
              <label htmlFor="nome">Nome:</label>
              <Field name="nome" type="text" placeholder="João Silva" />
              <ErrorMessage name="nome" component="div" className="error-message" />
            </div>
            <div className="input-box">
              <label htmlFor="email">Email:</label>
              <Field name="email" type="email" placeholder="exemplo@gmail.com" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="input-box">
              <label htmlFor="telefone">Telefone:</label>
              <Field name="telefone" type="text" placeholder="11 99442-5521" />
              <ErrorMessage name="telefone" component="div" className="error-message" />
            </div>
            <div className="input-box">
              <label htmlFor="password">Senha:</label>
              <Field name="password" type="password" placeholder="*******" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <div className="input-box">
              <label htmlFor="confirmPassword">Confirme a senha:</label>
              <Field name="confirmPassword" type="password" placeholder="Confirme a senha" />
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
            </div>
            <button className="btn" type="submit">
              Cadastrar
            </button>
          </div>
          <div className="box-logar">
            <div>
              <p>Já possui conta?</p>
            </div>
            <div>
              <a
                className="link"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Logar-se agora
              </a>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Cadastro;
