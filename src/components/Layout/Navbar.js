import { Link, useNavigate } from "react-router-dom";
import classes from "./Navbar.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { authActions } from "../../store/AuthSlice";
import ComposeMail from "../compose/ComposeMail";

const Navbar = () => {

  const navigate = useNavigate();

  const loginHandler = () => {


    // navigate("/");
    navigate("/dash");
  };
  return (
    <>
      <header className={classes.header}>
        <nav>
          <ul>
          <li> <Link to='/compose'>Compose</Link></li>
            {(
              <button
                className={classes.loginbtn} onClick={loginHandler}
              >
                Login
              </button>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;