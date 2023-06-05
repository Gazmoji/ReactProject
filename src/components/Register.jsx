import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { HEROKU_API_ROUTE } from "./Login";

function Register(props) {
  const [information, setInformation] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInfo = (e) => {
    const { name, value } = e.target;
    setInformation({
      ...information,
      [name]: value,
    });
  };

  const registerUser = async () => {
    const response = await fetch(`https://${HEROKU_API_ROUTE}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(information),
    });
    const result = await response.json();

    if (result.success) {
      navigate("/login");
    } else {
      setErrorMessage("Email or Username already in use.");
    }
  };
  return (
    <>
      <div id="boarder">
        <img src="https://fontmeme.com/permalink/230506/215049b2b1959c91ceeeb8376bdb726e.png" />
        <h2 id="registerEnter">
          <img
            src="https://img.pokemondb.net/sprites/scarlet-violet/normal/gengar.png"
            width="80px"
          />
          Enter Your Information Below
          <img
            src="https://img.pokemondb.net/sprites/scarlet-violet/normal/1x/tyranitar.png"
            width="80px"
          />
        </h2>
        <input
          type="email"
          name="email"
          placeholder="Enter your E-mail"
          onChange={handleInfo}
        />
        <input
          type="text"
          name="name"
          placeholder="Create A Username"
          onChange={handleInfo}
        />
        <input
          type="password"
          name="password"
          placeholder="Create a Password"
          onChange={handleInfo}
        />
        <button id="registerbutton2" onClick={registerUser}>
          Create Account
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </>
  );
}

export default Register;
