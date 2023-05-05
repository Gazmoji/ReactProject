import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
function Register(props) {
  const [information, setInformation] = useState({});
  const navigate = useNavigate();

  const handleInfo = (e) => {
    const { name, value } = e.target;
    setInformation({
      ...information,
      [name]: value,
    });
  };

  const registerUser = async () => {
    const response = await fetch("http://localhost:8080/register", {
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
      console.log("Error");
    }
  };
  return (
    <>
      <h2>Enter Your Information Below</h2>
      <input
        type="text"
        name="email"
        placeholder="Enter your E-mail"
        onChange={handleInfo}
      />
      <input
        type="text"
        name="username"
        placeholder="Create A Username"
        onChange={handleInfo}
      />
      <input
        type="text"
        name="password"
        placeholder="Create a Password"
        onChange={handleInfo}
      />
      <button onClick={registerUser}>Create Account</button>
    </>
  );
}

export default Register;
