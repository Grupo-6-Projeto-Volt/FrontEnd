import React, { useState } from "react";
import "./Cadastro.css";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import logo from "../../utils/assets/logo-ichiban.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatPhoneNumber } from "../../utils/global";

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
        toast.success("Cadastro feito com sucesso!!");
        navigate("/login");
      })
      .catch((erro) => {
        console.error("Houve um erro: " + erro);
        toast.error("Informações incorretas!!");
      });
  };

  const validationsRegister = yup.object().shape({
    nome: yup
      .string().required("Nome é obrigatório")
      .min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: yup
      .string().email("Email deve conter @").required("O email é obrigatório")
      .min(3, "O email deve ter pelo menos 3 caracteres"),
    telefone: yup
      .string().required("Telefone é obrigatório")
      .min(10, "O telefone deve ter pelo menos 10 caracteres"),
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
                navigate("/ ");
              }}
            >
              Voltar
            </p>
          </div>
          <h1 className="titulo">Cadastrar</h1>
          <div className="input-group">
            <div className="input-group-2">              
              <div className="input-box">
                <label htmlFor="nome">Nome:</label>
                <Field name="nome" type="text" placeholder="João Silva" />
                <ErrorMessage name="nome" component="div" className="error-message" />
              </div>
            </div>
              <div className="input-group-1">
                <div className="input-box">
                    <label htmlFor="email">E-mail:</label>
                    <Field name="email" type="email" placeholder="exemplo@gmail.com" />
                    <ErrorMessage name="email" component="div" className="error-message" />
                  </div>     
                <div className="input-box">
                    <label htmlFor="telefone">Telefone:</label>
                    <Field name="telefone" type="text" placeholder="(11) 9 9442-5521" onBlur={(e) => e.target.value = (formatPhoneNumber(e.target.value))} maxLength={11}/>
                    <ErrorMessage name="telefone" component="div" className="error-message" />
                  </div>
              </div> 
              <div className="input-group-1">  
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
                  navigate("/");
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
