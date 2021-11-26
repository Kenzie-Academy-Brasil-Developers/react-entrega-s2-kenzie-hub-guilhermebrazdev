import { useState } from "react";

import { useForm } from "react-hook-form";
import axios from "axios";

import "./styles.css";

function ModalTech({ setModal, addTech, deleteModal, currentCard, callTech }) {
  const [level, setLevel] = useState("");

  console.log(currentCard);
  const tech_id = currentCard.id;
  console.log("techid", tech_id);

  const token = JSON.parse(localStorage.getItem("@KenzieHub:token"));

  const { register, handleSubmit } = useForm();

  function confirm(data) {
    console.log(data);

    const tech = {
      status: level,
      title: data.title,
    };

    axios
      .post("https://kenziehub.herokuapp.com/users/techs/", tech, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("adicionado", response);
        const techInfo = {
          title: response.data.title,
          status: response.data.status,
        };
        callTech();
        setModal(false);
        addTech(techInfo);
      })
      .catch((err) => {
        console.log("erro", err);
      });
  }

  function deletar() {
    console.log(token);
    axios
      .delete(`https://kenziehub.herokuapp.com/users/techs/${tech_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("deletado", response);

        callTech();

        setModal(false);
      })
      .catch((err) => {
        console.log("erro", err);
      });
  }

  return (
    <div className="modal">
      {deleteModal ? (
        <form className="modalBox" onSubmit={handleSubmit(deletar)}>
          <h1>Atualizar tecnologia</h1>
          <div>
            <p> Nome: {currentCard.title} </p>
            <p>Nível: {currentCard.status} </p>
          </div>

          {/* <div id="levelSelect">
            <span className="lvlBtn" onClick={() => setLevel("Iniciante")}>
              Iniciante
            </span>
            <span className="lvlBtn" onClick={() => setLevel("Intermediário")}>
              Intermediário
            </span>
            <span className="lvlBtn" onClick={() => setLevel("Avançado")}>
              Avançado
            </span>
          </div> */}
          <div>
            <button type="submit">Confirmar</button>
          </div>
        </form>
      ) : (
        <form className="modalBox" onSubmit={handleSubmit(confirm)}>
          <p>Cadastrar tecnologia</p>
          <input
            type="text"
            {...register("title")}
            placeholder="Nome da Tech"
            required
          />
          <div id="levelSelect">
            <span className="lvlBtn" onClick={() => setLevel("Iniciante")}>
              Iniciante
            </span>
            <span className="lvlBtn" onClick={() => setLevel("Intermediário")}>
              Intermediário
            </span>
            <span className="lvlBtn" onClick={() => setLevel("Avançado")}>
              Avançado
            </span>
          </div>
          <div>
            <button type="submit">Confirmar</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ModalTech;
