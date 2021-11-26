import "./styles.css";

function Perfil({ logout }) {
  // const usuario = JSON.parse(localStorage.getItem("@userInfo"));

  return (
    <div id="perfil">
      <div id="perfBox">
        <div id="perfHeader">
          <p>Perfil</p>
        </div>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  );
}

export default Perfil;
