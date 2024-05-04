// import React, { useState } from 'react';
// import { Form, FloatingLabel, Button } from 'react-bootstrap';
// import { useRef } from 'react';
// import {useDispatch} from 'react-redux';
// import { authActions } from './store/AuthSlice';
// import { useNavigate } from 'react-router-dom';
// import './Auth.css'
// const AuthPage = () => {
//   const navigate = useNavigate();
//     const emailRef = useRef();
//     const passwordRef = useRef();

//     const dispatch = useDispatch();
//     // const navigate = useNavigate();
//     const [isLogin, setIsLogin] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);


//     const switchAuthModeHandler = () => {
//         setIsLogin((prevState) => !prevState);
//       };
//       const submitHandler = async (e) => {
//           e.preventDefault();
//           if (!emailRef.current || !passwordRef.current) {
//             console.error("emailRef or passwordRef is not defined");
//             return;
//           }
//           const enteredEmail = emailRef.current.value;
//           const enteredPassword = passwordRef.current.value;
//           // navigate('/dash');

          
//           setIsLoading(true);
//           let url;
//           if (!isLogin) {
//             url =  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7giupDuav11NLNM02yGpKFNcFcqx-q3A"
//              ;
//           } else {
//             url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7giupDuav11NLNM02yGpKFNcFcqx-q3A"
//              ;
//           }
//           try {
//             const res = await fetch(url, {
//               method: "POST",
//               body: JSON.stringify({
//                 email: enteredEmail,
//                 password: enteredPassword,
//                 returnSecureToken: true,
//               }),
//               headers: { "Content-type": "application/json" },
//             });
//             const data = await res.json();
           
//             setIsLoading(false);
//             console.log("user has successfully signed up")
//             if (!res.ok) {
//               throw new Error(data.error?.message || "Authentication failed");
//             }

//             dispatch(authActions.login({ idToken: data.idToken, email: data.email }));


//             setIsLoading(false);
//             navigate('/compose')
//           } catch (err) {
//             alert(err.message);
//           }

//           emailRef.current.value = "";
//           passwordRef.current.value = "";
//           navigate('/compose');
//         };

//   return (
//      <div className="formbody">
//     <div className="col-md-3 p-3 border">
//     <h1 className="mb-4">{isLogin ? "Login" : "Sign up"}</h1>
//     <Form onSubmit={submitHandler}>
//       <FloatingLabel controlId="email" label="Email" className="mb-3">
//         <Form.Control
//           type="email"
//           placeholder="name@example.com"
//           name="email"
// ref={emailRef}
//           required
//         />
//       </FloatingLabel>

//       <FloatingLabel controlId="password" label="Password" className="mb-3">
//         <Form.Control
//           type="password"
//           placeholder="Password"
//           name="password"
//           ref={passwordRef}

//           required
//         />
//       </FloatingLabel>

//       {!isLogin && <FloatingLabel controlId="confirmPassword" label="Confirm Password" className="mb-3">
//         <Form.Control
//           type="password"
//           placeholder="Confirm Password"
//           name="confirmPassword"

//           required
//         />
//       </FloatingLabel>}
//       {isLogin && (
//             <Button variant="link" >
//               Forgot Password?
//             </Button>
//           )}

//      { !isLoading && <Button className="btn btn-primary btn-block" type="submit">
//       {!isLogin ? "Sign up" : "Login"}
//       </Button>}
//       {isLoading && <p>Sending Request...</p>}

//     </Form>
//     <div className='signup_link'>
//             <div type="button"    onClick={switchAuthModeHandler}  >
//               {isLogin ? "Don't have an account? " : "Already have an Account?"}
//               <span style={{ cursor: "pointer", color: "#007bff" }}>
//                 {isLogin ? "Sign up!" : "Login"}
//               </span>
//             </div>
//           </div>
//           </div>
//           </div>      
//     );
// };

// export default AuthPage;
import React, { useRef, useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import './Auth.css'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from './store/AuthSlice';
const AuthPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const switchAuthModeHandler = () => {
      setIsLogin((prevState) => !prevState);
    };
    const submitHandler = async (e) => {
      e.preventDefault();
      const enteredEmail = emailRef.current.value;
      const enteredPassword = passwordRef.current.value;

      setIsLoading(true);
      let url;
      if (!isLogin) {
        url =  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7giupDuav11NLNM02yGpKFNcFcqx-q3A"
         ;
      } else {
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7giupDuav11NLNM02yGpKFNcFcqx-q3A"
         ;
      }
      try {
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: { "Content-type": "application/json" },
        });
        const data = await res.json();
        setIsLoading(false);
        if (!res.ok) {
          throw new Error(data.error?.message || "Authentication failed");
        }

        dispatch(authActions.login({ idToken: data.idToken, email: data.email }));


        setIsLoading(false);
      } catch (err) {
        alert(err.message);
      }

      emailRef.current.value = "";
      passwordRef.current.value = "";
    };

  const forgotPasswordHandler = async (e) => {
      e.preventDefault();
      const urlF =
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCymBnMGKercMKC33MG5aQaXigQY8dlVBQ";
      const enteredEmail = emailRef.current.value;
      try {
        const response = await fetch(urlF, {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: enteredEmail,
          }),
          headers: {
            "Content-type": "application/json",
          },
        });
        setIsLoading(false);
        if (response.ok) {
          console.log("request sent successfully");
          return response.json();
        } else {
          if (
            response.error &&
            response.error.message === "RESET_PASSWORD_EXCEED_LIMIT"
          ) {
            console.log("Password reset limit exceeded. Please try again later.");
          } else
            return response.json().then((data) => {
              let errorMsg = "Error sending password reset email";
              console.log(data);
              throw new Error(errorMsg);
            });
        }
      } catch (err) {
        console.log(err);
      }
    };
  return (<>
     <div className="formbody">
    <div className="col-md-3 p-3 border">
    <h1 className="mb-4">{isLogin ? "Login" : "Sign up"}</h1>
    <Form onSubmit={submitHandler} >
      <FloatingLabel controlId="email" label="Email Address" className="mb-3">
        <Form.Control
          type="email"
          placeholder="name@example.com"
          ref={emailRef}

          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="password" label="Password" className="mb-3">
        <Form.Control
          type="password"
          placeholder="Password"
          // name="password"
ref={passwordRef}
          required
        />
      </FloatingLabel>

      {/* {!isLogin && <FloatingLabel controlId="confirmPassword" label="Confirm Password" className="mb-3">
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"

          required
        />
      </FloatingLabel>} */}
      {isLogin && (
            <Button variant="link" onClick={forgotPasswordHandler}>
              Forgot Password?
            </Button>
          )}

     { !isLoading && <Button className="btn btn-primary btn-block" type="submit">
      {!isLogin ? "Sign up" : "Login"}
      </Button>}
      {isLoading && <p>Sending Request...</p>}

    </Form>
    <div className='signup_link'>
            <div type="button"    onClick={switchAuthModeHandler}  >
              {isLogin ? "Don't have an account? " : "Already have an Account?"}
              <span style={{ cursor: "pointer", color: "#007bff" }}>
                {isLogin ? "Sign up!" : "Login"}
              </span>
            </div>
          </div>
          </div>
          </div>      
    </>);
};

export default AuthPage;