import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function Logout(props) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = "";
  }, []);

  useEffect(() => {
    localStorage.removeItem("jwtToken");

    props.onLogout();

    navigate("/");
  });

  return <></>;
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch({ type: "ON_LOGOUT" }),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
