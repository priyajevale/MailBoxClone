// import { Link, useNavigate } from "react-router-dom";
// import classes from "./Navbar.module.css";
// // import { useDispatch, useSelector } from "react-redux";
// // import { authActions } from "../../store/AuthSlice";
// import ComposeMail from "../compose/ComposeMail";

// const Navbar = () => {

//   const navigate = useNavigate();

//   const loginHandler = () => {


//     // navigate("/");
//     navigate("/dash");
//   };
//   return (
//     <>
//       <header className={classes.header}>
//         <nav>
//           <ul>
//           <li> <Link to='/compose'>Compose</Link></li>
//             {(
//               <button
//                 className={classes.loginbtn} onClick={loginHandler}
//               >
//                 Login
//               </button>
//             )}
//           </ul>
//         </nav>
//       </header>
//     </>
//   );
// };

// export default Navbar;
import { Link, useNavigate } from "react-router-dom";
import classes from "./Navbar.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { authActions } from "../../store/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
 import { authActions } from "../Login/store/AuthSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated)
   console.log(isLoggedIn)

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const loginHandler = () => {
    navigate("/auth");
  };
  const logout = () => {
    navigate('/auth')
    dispatch(authActions.logout())
   
  };
  return (
    <>
      <header className={classes.header}>
        <nav>
          <ul>

            {(
              <button
                className={classes.loginbtn} onClick={loginHandler}
              >
                {!isLoggedIn && ( <button className={classes.loginbtn} onClick={loginHandler} >
                Login
              </button>
            )}
             </button> )}
        {isLoggedIn && ( <button className={classes.loginbtn} onClick={logout} >
                Logout
        </button> )}
          </ul>
        </nav>
      </header>
      <nav>
          <ul>
            {/* <Link to="/compose">  <button className={classes.compose}>✏️ Compose</button></Link> */}
            {isLoggedIn && <Link to="/compose">  <button className={classes.compose}>✏️ Compose</button></Link>}
            {/* <li> <Link to='/inbox'>✉️ Inbox</Link></li>
            <li> <Link to='/sent'>🡆 Sent</Link></li> */}
            { isLoggedIn && <li> <Link to='/inbox'>✉️ Inbox</Link></li>}
           { isLoggedIn &&  <li> <Link to='/sent'>🡆 Sent</Link></li>}
          </ul> 
        </nav>
    </>
  );
};

export default Navbar;