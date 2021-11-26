import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router";
import { TextField } from "@mui/material";

import axios from "axios";
import { toast } from "react-hot-toast";

import "./styles.css";

function Signup() {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Nome Obrigatório")
      .matches(
        /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
        "Nome deve conter apenas letras"
      ),
    email: yup.string().required("Email Obrigatório").email("Email Inválido"),
    bio: yup.string().required("Fale um pouco sobre você"),
    contact: yup.string().required("Insira seu contato"),
    course_module: yup.string().required("Seleciona seu Módulo"),
    password: yup
      .string()
      .required("Senha Obrigatório")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        "Mínimo de 8 dígitos(Carac. Especial, Num, Maiúscula, Minúscula)"
        // deve conter ao menos um dígito
        // deve conter ao menos uma letra minúscula
        // deve conter ao menos uma letra maiúscula
        // deve conter ao menos um caractere especial
        // deve conter ao menos 8 dos caracteres mencionados
      ),
    confirmPassword: yup
      .string()
      .required("Confirmação de Senha Obrigatório")
      .oneOf([yup.ref("password")], "As senhas devem ser iguais"),
  });

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitFunction = (data) => {
    console.log("dados", data);
    axios
      .post("https://kenziehub.herokuapp.com/users", data)
      .then((response) => {
        console.log(response);
        toast.success("Cadastro realizado com sucesso");
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Cadastro falhou, Tente outro e-mail");
      });
  };

  return (
    <div>
      <div>
        <div id="title">
          <h1>
            Kenzie <span>Hub</span>
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <div className="singleInput">
            <span> {errors && <p> {errors.name?.message}</p>} </span>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="text"
              label="Nome"
              {...register("name")}
              fullWidth
            />
          </div>

          <div className="singleInput">
            <span> {errors && <p> {errors.email?.message}</p>} </span>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="email"
              label="Email"
              {...register("email")}
              fullWidth
            />
          </div>

          <div className="singleInput">
            <span> {errors && <p> {errors.email?.message}</p>} </span>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="text"
              label="Bio"
              {...register("bio")}
              fullWidth
            />
          </div>

          <div className="singleInput">
            <span> {errors && <p> {errors.email?.message}</p>} </span>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="textarea"
              label="Contato"
              {...register("contact")}
              fullWidth
            />
          </div>
          <div className="singleInput" id="select">
            <span> {errors && <p> {errors.course_module?.message}</p>} </span>
            <select id="course_module" {...register("course_module")}>
              <option value="">Selecione seu Módulo</option>
              <option value="Primeiro módulo (Introdução ao Frontend)">
                Primeiro módulo (Introdução ao Frontend)
              </option>
              <option value="Segundo módulo (Frontend Avançado)">
                Segundo módulo (Frontend Avançado)
              </option>
              <option value="Terceiro Módulo (introdução ao Backend)">
                Terceiro Módulo (introdução ao Backend)
              </option>
              <option value="Quarto Módulo (Backend Avançado)">
                Quarto Módulo (Backend Avançado)
              </option>
            </select>
          </div>

          <div className="singleInput">
            <span> {errors && <p> {errors.email?.message}</p>} </span>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="password"
              label="Senha"
              {...register("password")}
              fullWidth
            />
          </div>

          <div className="singleInput">
            <span> {errors && <p> {errors.email?.message}</p>} </span>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="password"
              label="Confirmar Senha"
              {...register("confirmPassword")}
              fullWidth
            />
          </div>

          <button type="submit" id="signupButton">
            Cadastrar-se
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
