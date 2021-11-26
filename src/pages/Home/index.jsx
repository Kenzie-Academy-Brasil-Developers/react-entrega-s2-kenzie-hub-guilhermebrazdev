import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Redirect, useHistory } from "react-router";
import { TextField } from "@mui/material";

import axios from "axios";
import { toast } from "react-hot-toast";

import "./styles.css";

function Login({ authenticated, setAuthenticated }) {
  const schema = yup.object().shape({
    email: yup.string().required("Email Obrigatório").email("Email Inválido"),
    password: yup.string().required("Senha Obrigatório"),
    /*.matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        "Mínimo de 8 dígitos(Carac. Especial, Num, Maiúscula, Minúscula)"
        // deve conter ao menos um dígito
        // deve conter ao menos uma letra minúscula
        // deve conter ao menos uma letra maiúscula
        // deve conter ao menos um caractere especial
        // deve conter ao menos 8 dos caracteres mencionados
      )*/
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
      .post("https://kenziehub.herokuapp.com/sessions", data)
      .then((response) => {
        const { token } = response.data;

        console.log("resposta", response);

        toast.success("Login realizado com sucesso!");
        localStorage.setItem("@KenzieHub:token", JSON.stringify(token));
        localStorage.setItem("@userInfo", JSON.stringify(response.data.user));

        setAuthenticated(true);
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Cadastro falhou, Verifique o e-mail e senha");
      });
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div id="home">
      <div id="title">
        <h1>
          Kenzie <span>Hub</span>
        </h1>
      </div>
      <div id="inputBox">
        <form onSubmit={handleSubmit(onSubmitFunction)}>
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
            <span> {errors && <p> {errors.password?.message}</p>}</span>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="password"
              label="Password"
              {...register("password")}
              fullWidth
            />
          </div>
          <div id="botoes">
            <button id="login" type="submit">
              Logar
            </button>
            <button id="cadastro" onClick={() => history.push("/signup")}>
              Cadastrar-se
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
