import { useState } from "react";
import { TextField } from "@mui/material";

import "./styles.css";

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
        <p>Cadastrar trabalho</p>

        <div className="singleInputModal">
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="text"
            label="Nome do trabalho"
            {...register("title")}
            fullWidth
            required
          />
        </div>

        <div className="singleInputModal">
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="text"
            label="Descrição"
            {...register("description")}
            fullWidth
            required
          />
        </div>

        <div className="singleInputModal">
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="text"
            label="Link"
            {...register("url")}
            fullWidth
            required
          />
        </div>
        <div id="cadastroBox">
          <button type="submit">Confirmar</button>
        </div>
      </form>
    </div>
  );
}

export default ModalWork;
