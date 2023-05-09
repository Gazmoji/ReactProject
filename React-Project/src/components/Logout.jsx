import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function Logout(props) {
  const navigate = useNavigate();

  useEffect(() => {
    // remove the token from local storage
    localStorage.removeItem("jwtToken");

    // update global redux state and set isAuthenticated to false
    props.onLogout();

    // take the user to Login
    navigate("/login");
  });

  return <></>;
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch({ type: "ON_LOGOUT" }),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
