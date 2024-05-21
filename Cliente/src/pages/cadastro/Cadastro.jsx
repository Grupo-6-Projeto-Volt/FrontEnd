import React from "react";
import "./Cadastro.css";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from '../../utils/assets/logo-ichiban.png'


const Cadastro = () => {
  const navigate = useNavigate();
  const handleRegister = (values) => {
    Axios.post("http://localhost:3001/register", {
      email: values.email,
      password: values.password,
    })
      .then((response) => {
        alert(response.data.msg);
        console.log(response);
      })
      .catch((error) => {
        alert(error.response.data.msg);
      });
  };

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
                <img src={logo} className="logo"></img>
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
            <Field name="nome" className="form-field" placeholder="Nome" />
            <ErrorMessage
                component="span"
                name="nome"
                className="form-error"
            />
            </div>
            <div className="input-box">
            <label>Email:</label>
              <Field name="email" className="form-field" placeholder="Email" />
              <ErrorMessage
                component="span"
                name="email"
                className="form-error"
              />
            </div>
            <div className="input-box">
            <label>Senha:</label>
              <Field
                name="password"
                className="form-field"
                placeholder="Senha"
              />
              <ErrorMessage
                component="span"
                name="password"
                className="form-error"
              />
            </div>
            <div className="input-box">
            <label>Confirme a senha:</label>
              <Field
                name="confirmation"
                className="form-field"
                placeholder="Confirme a senha"
              />
              <ErrorMessage
                component="span"
                name="confirmation"
                className="form-error"
              />
            </div>
          </div>
          <button className="btn" type="submit">
            Cadastrar
          </button>
          <p onClick={() => {
                    navigate("/login")
                }}>Ja possui conta? Logar-se agora</p>
        </Form>
      </Formik>
    </div>
  );
};

export default Cadastro;
