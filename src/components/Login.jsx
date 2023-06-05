import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

export const HEROKU_API_ROUTE = `poke-squad.herokuapp.com`;

function Login(props) {
  const [loginInfo, setLoginInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLoginInfo = (e) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const loginUser = async () => {
    const response = await fetch(`https://${HEROKU_API_ROUTE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });
    const result = await response.json();

    if (result.success) {
      localStorage.setItem("jwtToken", result.token);
      props.onLogin(result.token, result.username);
      navigate("/main-content");
    } else {
      setErrorMessage("Invalid Login Info.");
    }
  };
  return (
    <>
      <div id="boarder">
        <img src="https://fontmeme.com/permalink/230506/215049b2b1959c91ceeeb8376bdb726e.png" />
        <h2>
          <img
            src="https://img.pokemondb.net/sprites/scarlet-violet/normal/1x/lucario.png"
            width="110px"
          />
          Login Here
          <img
            src="https://img.pokemondb.net/sprites/scarlet-violet/normal/1x/gardevoir.png"
            width="80px"
          />
        </h2>
        <input
          type="email"
          name="email"
          placeholder="Enter your E-mail"
          onChange={handleLoginInfo}
        />
        <input
          type="text"
          name="name"
          placeholder="Enter your Username"
          onChange={handleLoginInfo}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          onChange={handleLoginInfo}
        />
        <button id="registerbutton2" onClick={loginUser}>
          Log In
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (token, username) =>
      dispatch({ type: "ON_LOGIN", payload: { token, username } }),
  };
};

export default connect(null, mapDispatchToProps)(Login);
