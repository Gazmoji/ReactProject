import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

function NavBar(props) {
  return (
    <>
      <nav className="navbar">
        <img
          src="https://fontmeme.com/permalink/230506/215049b2b1959c91ceeeb8376bdb726e.png"
          width="200px"
        />
        {props.username && <span id="navbar-username">{props.username}</span>}
        {props.isAuth ? <NavLink to="/logout">Logout</NavLink> : null}
      </nav>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuthenticated,
    username: state.username,
  };
};

export default connect(mapStateToProps)(NavBar);
