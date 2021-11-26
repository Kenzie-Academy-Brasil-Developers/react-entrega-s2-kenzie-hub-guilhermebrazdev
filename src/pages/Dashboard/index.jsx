import { Redirect } from "react-router-dom";
// import { useHistory } from "react-router";
import Perfil from "../../components/Perfil";
import Tecnologias from "../../components/Tecnologias";
import Trabalhos from "../../components/Trabalhos";
import ModalTech from "../../components/ModalTech";
import ModalWork from "../../components/ModalWork";
import axios from "axios";

import { useEffect, useState } from "react";

import "./styles.css";

function Dashboard({ authenticated, setAuthenticated }) {
  //----------------------TECNOLOGIAS-------------------------------//
  const [tecnologias, setTecnologias] = useState([]);

  const usuario = JSON.parse(localStorage.getItem("@userInfo")) || "";
  const [tech, setTech] = useState([]);

  function callTech() {
    axios
      .get(`https://kenziehub.herokuapp.com/users/${usuario.id}`)
      .then((response) => {
        setTech([...response.data.techs]);
      })
      .catch((err) => {
        console.log("erro", err);
      });
  }

  useEffect(() => {
    callTech();
  }, []);

  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentCard, setCurrentCard] = useState({});

  function deleteStatus(element) {
    setDeleteModal(true);
    setModal(true);
    setCurrentCard(element);
  }

  function addTech(newTech) {
    setTecnologias([...tecnologias, newTech]);
  }

  function deleteTech(title) {
    const newTechs = tecnologias.filter((element) => element.title !== title);
    setTecnologias(newTechs);
  }

  function logout() {
    setAuthenticated(false);
    localStorage.clear();
  }

  function visibleModal() {
    setModal(!modal);
  }

  //--------------------------------TRABALHOS------------------------------//
  const [trabalhos, setTrabalhos] = useState([]);
  const [workModal, setWorkModal] = useState(false);

  function visibleWorkModal() {
    setWorkModal(true);
  }

  function addWork(newWork) {
    setTrabalhos([...trabalhos, newWork]);
  }

  function deleteWork(title) {
    const newWork = trabalhos.filter((element) => element.title !== title);
    setTrabalhos(newWork);
  }

  if (authenticated === false) {
    return <Redirect to="/" />;
  }

  return (
    <div id="dashboard">
      {workModal && <ModalWork setWorkModal={setWorkModal} addWork={addWork} />}

      {modal && (
        <ModalTech
          setModal={setModal}
          addTech={addTech}
          deleteModal={deleteModal}
          currentCard={currentCard}
          callTech={callTech}
        />
      )}
      <div id="cardBox">
        <div id="titleBox">
          <div id="titulo">
            <h1>
              Kenzie<span>Hub</span>
            </h1>
          </div>
          <div id="image">foto</div>
        </div>
        <div id="userCard">
          <Tecnologias
            tecnologias={tech}
            visibleModal={visibleModal}
            deleteTech={deleteTech}
            deleteStatus={deleteStatus}
          />
          <Trabalhos
            trabalhos={trabalhos}
            visibleWorkModal={visibleWorkModal}
            deleteWork={deleteWork}
          />
          <Perfil logout={logout} />
        </div>
      </div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

export default Dashboard;
