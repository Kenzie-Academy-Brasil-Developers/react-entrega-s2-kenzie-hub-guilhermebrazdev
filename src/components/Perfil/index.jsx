import "./styles.css";

function Perfil() {
  const usuario = JSON.parse(localStorage.getItem("@userInfo"));

  return (
    <div id="perfil">
      <div id="perfBox">
        <div id="perfHeader">
          <p>Perfil</p>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
