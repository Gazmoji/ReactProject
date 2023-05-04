import { useNavigate, useNavigation } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  const sendToRegister = () => {
    navigate("/register");
  };
  return (
    <>
      <h1>Poké-Squad</h1>
      <h3>Create and Customize your own Pokémon Teams!</h3>
      <button onClick={sendToRegister}>Register Now</button>
      <a href="#">
        <p>Already a User? Sign in</p>
      </a>
    </>
  );
}

export default Homepage;
