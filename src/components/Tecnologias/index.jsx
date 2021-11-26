import { FiGitPullRequest, FiCodesandbox, FiCode } from "react-icons/fi";

import "./styles.css";

function Tecnologias({ tecnologias, visibleModal, deleteTech, deleteStatus }) {
  return (
    <div id="tecnologias">
      <div id="techBox">
        <div id="techHeader">
          <p>Minhas Tecnologias</p>
          <button onClick={() => visibleModal()}>+</button>
        </div>
        {tecnologias.map((element, index) => (
          <div key={index} id="singleTech">
            <div id="iconBox">
              <FiCodesandbox />
            </div>
            <div>
              <h4>{element.title}</h4>
              <p> {element.status} </p>
            </div>
            <button onClick={() => deleteStatus(element)}>Remover</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tecnologias;
