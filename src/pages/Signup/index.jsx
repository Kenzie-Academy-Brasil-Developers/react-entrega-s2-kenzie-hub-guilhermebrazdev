import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router";

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
      <h1>Cadastro</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <div className="singleInput">
            <span>Nome {errors && <p> : {errors.name?.message}</p>}</span>

            <input
              type="text"
              label="Nome"
              placeholder="Seu Nome"
              {...register("name")}
              name="name"
            />
          </div>
          <div className="singleInput">
            <span>Email {errors && <p> : {errors.email?.message}</p>}</span>

            <input
              type="email"
              label="Email"
              placeholder="Email"
              {...register("email")}
              name="email"
            />
          </div>
          <div className="singleInput">
            <span>Bio {errors && <p> : {errors.bio?.message}</p>}</span>

            <input
              type="text"
              label="Bio"
              placeholder="Bio"
              {...register("bio")}
            />
          </div>
          <div className="singleInput">
            <span>Contato {errors && <p> : {errors.contact?.message}</p>}</span>

            <input
              type="textarea"
              label="Contato"
              placeholder="Contato"
              {...register("contact")}
            />
          </div>
          <div className="singleInput">
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
            <span>Senha {errors && <p> : {errors.password?.message}</p>}</span>

            <input
              label="Senha"
              placeholder="Senha"
              {...register("password")}
              name="password"
            />
          </div>
          <div className="singleInput">
            <span>
              Confirmar senha{" "}
              {errors && <p> : {errors.confirmPassword?.message}</p>}
            </span>

            <input
              label="Confirmação da senha"
              placeholder="Confirme sua senha"
              {...register("confirmPassword")}
              name="confirmPassword"
            />
          </div>

          <button type="submit">Cadastrar-se</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
