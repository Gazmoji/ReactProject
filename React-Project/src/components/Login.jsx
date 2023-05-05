import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

function Login(props) {
  const [loginInfo, setLoginInfo] = useState({});
  const navigate = useNavigate();

  const handleLoginInfo = (e) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const loginUser = async () => {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });
    const result = await response.json();

    if (result.success) {
      localStorage.setItem("jwtToken", result.token);
      props.onLogin(result.token);
      navigate("/main-content");
    } else {
      console.log("Error");
    }
  };
  return (
    <>
      <h2>Log In</h2>
      <input
        type="text"
        name="email"
        placeholder="Enter your E-mail"
        onChange={handleLoginInfo}
      />
      <input
        type="username"
        name="username"
        placeholder="Enter your Username"
        onChange={handleLoginInfo}
      />
      <input
        type="text"
        name="password"
        placeholder="Enter your Password"
        onChange={handleLoginInfo}
      />
      <button onClick={loginUser}>Log In</button>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (token) => dispatch({ type: "ON_LOGIN", payload: token }),
  };
};

export default connect(null, mapDispatchToProps)(Login);
