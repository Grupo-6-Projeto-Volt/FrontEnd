import React from "react";
import "./Cadastro.css";
import * as yup from "yup";
import { Formik, Form } from "formik";
import api from '../../api';
import { useNavigate } from "react-router-dom";
import logo from '../../utils/assets/logo-ichiban.png';
import { useState } from 'react'; 

const Cadastro = () => {
    let [nomeText, setNomeText] = useState("");
    let [emailText, setEmailText] = useState("");
    let [telefoneText, setTelefoneText] = useState("");
    let [passwordText, setPasswordText] = useState("");
    const navigate = useNavigate();

    function handleRegister(){
        api.post("/usuarios",{
            nome: nomeText,
            email: emailText,
            telefone: telefoneText,
            categoria: 1,
            senha: passwordText
        }).then(resultado => {
            const Data = resultado.data;
            sessionStorage.TOKEN = Data.token;
            sessionStorage.ID = Data.userId;
            sessionStorage.NOME = Data.nome;
            sessionStorage.EMAIL = Data.email;
            sessionStorage.TELEFONE = Data.telefone;
            sessionStorage.CATEGORIA = Data.categoria;
            alert("Cadastro feito com sucesso!!")
            navigate("/pagina")
        }).catch(erro => {
            console.error("Houve um erro: " + erro);
            alert("Informações incorretas!!")
        })
    }

  const validationsRegister = yup.object().shape({
    nome: yup
      .string()
      .required("Nome é obrigatório"),
    email: yup
      .string()
      .email("Email inválido")
      .required("O email é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("A senha é obrigatória"),
    confirmation: yup
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
        initialValues={{}}
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
          <h1 className="titulo">Cadastro</h1>
          <div className="input-group">
            <div className="input-box">
                        <label>Nome:</label>
                        <input onChange={(evento) => {
                            setNomeText(evento.target.value)
                        }} placeholder='Joao Silva' type='nome'></input>
                    </div>
            <div className="input-box">
                        <label>Email:</label>
                        <input onChange={(evento) => {
                            setEmailText(evento.target.value)
                        }} placeholder='Exemplo@gmail.com' type='email'></input>
            </div>
            <div className="input-box">
                        <label>Telefone:</label>
                        <input onChange={(evento) => {
                            setTelefoneText(evento.target.value)
                        }} placeholder='11 99442-5521' type='tell'></input>
            </div>
            <div className="input-box">
                        <label>Senha:</label>
                        <input onChange={(evento) => {
                            setPasswordText(evento.target.value)
                        }} placeholder='*******' type='password'></input>
            </div>
            <div className="input-box">
                        <label>Confirme a senha:</label>
                        <input placeholder='Confirme a senha' type='password'></input>
            </div>
          </div>
          <button onClick={handleRegister} className="btn" type="submit">
            Cadastrar
          </button>
          <p>Já possui conta?<a className="link" onClick={() => {
                    navigate("/login")
                }}> Logar-se agora</a></p>
        </Form>
      </Formik>
    </div>
  );
};

export default Cadastro;
