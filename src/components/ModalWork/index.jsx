import { useState } from "react";

import { useForm } from "react-hook-form";
// import axios from "axios";

// import "./styles.css";

function ModalWork({ setWorkModal, addWork }) {
  // const token = JSON.parse(localStorage.getItem("@KenzieHub:token"));

  const { register, handleSubmit } = useForm();

  function confirm(data) {
    setWorkModal(false);
    console.log(data);
    addWork(data);

    // const work = {
    //     title: data.title,
    //     description: data.description,
    //     deply_url: data.deply_url
    // };

    //     axios
    //       .post("https://kenziehub.herokuapp.com/users/works", work, {
    //         Authorization: `Bearer ${token}`,
    //       })
    //       .then((response) => {
    //             console.log("adicionado", response);
    //           })
    //           .catch((err) => {
    //             console.log("erro", err);
    //           });
  }

  return (
    <div className="modal">
      <form className="modalBox" onSubmit={handleSubmit(confirm)}>
        <p>Cadastrar tecnologia</p>
        <input
          type="text"
          {...register("title")}
          placeholder="Nome do trabalho"
          required
        />
        <input
          type="text"
          {...register("description")}
          placeholder="Descrição"
          required
        />
        <input
          type="text"
          {...register("deploy_url")}
          placeholder="URL do trabalho"
          required
        />
        <div>
          <button type="submit">Confirmar</button>
        </div>
      </form>
    </div>
  );
}

export default ModalWork;
