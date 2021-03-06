import "./styles.css";

function Trabalhos({ trabalhos, visibleWorkModal, deleteWork }) {
  const usuario = JSON.parse(localStorage.getItem("@userInfo"));

  console.log("trabalhos", trabalhos);

  return (
    <div id="trabalhos">
      <div id="workBox">
        <div id="workHeader">
          <p>Trabalhos</p>
          <button onClick={visibleWorkModal}>+</button>
        </div>
        {trabalhos.map((element, index) => (
          <div key={index} id="singleTech">
            {" "}
            <div>
              <div>{element.title}</div>
              <p> {element.description} </p>
              <p> {element.url} </p>
            </div>
            <button onClick={() => deleteWork(element.title)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trabalhos;
