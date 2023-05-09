import { useNavigate, useNavigation } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  const sendToRegister = () => {
    navigate("/register");
  };
  return (
    <>
      <div id="boarder">
        <img src="https://fontmeme.com/permalink/230506/215049b2b1959c91ceeeb8376bdb726e.png" />
        <h3>
          <img
            src="https://www.popsockets.com/dw/image/v2/BFSM_PRD/on/demandware.static/-/Sites-popsockets-master-catalog/default/dw7fe2333f/images/hi-res/Enamel_Pokeball_01_Top-View.png?sw=800&sh=800"
            width="25px"
          />
          Create and Customize your own Pokémon Teams!
          <img
            src="https://www.popsockets.com/dw/image/v2/BFSM_PRD/on/demandware.static/-/Sites-popsockets-master-catalog/default/dw7fe2333f/images/hi-res/Enamel_Pokeball_01_Top-View.png?sw=800&sh=800"
            width="25px"
          />
        </h3>
        <button id="registerbutton" onClick={sendToRegister}>
          Register Now
        </button>
        <a href="/login">
          <p>Already a User? Sign in</p>
        </a>
      </div>
    </>
  );
}

export default Homepage;
