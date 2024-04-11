// import React, { useEffect, useState } from "react";
// import { auth, provider } from "./config";
// import { signInWithPopup } from "firebase/auth";
// import { FcGoogle } from "react-icons/fc";
// import RecordList from "../components/recordList";
// import "./signIn.css"; 


// function SignIn() {
//   const [value, setValue] = useState("");

//   const handleClick = () => {
//     signInWithPopup(auth, provider).then((data) => {
//       setValue(data.user.email);
//       localStorage.setItem("email", data.user.email);
//     });
//   };

//   useEffect(() => {
//     setValue(localStorage.getItem("email"));
//   }, []);

//   return (
//     <div > 
//       {value ? (
//         <RecordList />
//       ) : (
//         <div className="container">
//        <div className="frame">
//         <button className="button" onClick={handleClick}>
//         <span className="text">Sign in With Google</span>
//           <span className="icon-space"><FcGoogle size={24} /></span>
//         </button>
//       </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SignIn;

//signIn.js
//signIn.js
//signIn.js
// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import RecordList from "../components/recordList";
import { Formik, Field, Form } from 'formik';
import "./signIn.css"; 
import img from './images/img.jpg'

function SignIn() {
 // eslint-disable-next-line
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState('');
 // eslint-disable-next-line
  const [loading, setLoading] = useState(false);


  const initialValues = {
      email: "",
      password: "",
  }

  const validateForm = (values) => {
      const errors = {};

      if (!values.email) {
          errors.email = "Email is required";
      } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
          errors.email = "Invalid email address";
      }

      if (!values.password) {
          errors.password = "Password number is required";
      } else if (values.password.length <= 8) {
          errors.password = "Password length must be more than 7"
      }

      return errors;
  }

  const onLogin = (values) => {
      setLoading(true);
      signInWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
              setLoading(false);
              const user = userCredential.user;
              navigate("/recordList")
              console.log(user);
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrors(errorMessage);
              setLoading(false);
              console.log(errorCode, errorMessage)
          });
  }

  const handleClick = () => {
    signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        console.log(user);
        navigate("/recordList")
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrors(errorMessage);
        setLoading(false);
        console.log(errorCode, errorMessage);
    });
}
  return (
    <div> 
      {value ? (
        <RecordList />
      ) : (
        <div className="container-fluid " style={{ height: "100vh", overflow: "hidden" }}>
          <div className="row ">
            <div className="col-md-6 d-flex align-items-center justify-content-center bg-dark px-0">
              {/* Left column with authentication form */}
              <div>
                <div className="card-body bg-dark">
                  <div className="px-10">
                    <div className="text-center">
                      <h2 className="text-2xl text-white font-bold mb-2">
                        Employee Management <span className="text-info font-bold">Systems</span>
                      </h2>
                      <h2 className="text-2xl text-white font-bold mb-2">
                        Wasabi <span className="text-info font-bold">TECHNOLOGIES</span>
                      </h2>
                    </div>
                  </div>
                  <div className='mt-4 text-xs' style={{ color: "red" }}>
                    {errors && errors}
                  </div>
                  <div>
                    <Formik
                      initialValues={initialValues}
                      validate={validateForm}
                      onSubmit={(values) => onLogin(values)}
                    >
                      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <Form className="bg-black text-white p-4 border border-white">
                          <h5 className="card-title">Authentication</h5>
                          <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <Field
                              type="text"
                              id="email"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              className="form-control bg-black text-white"
                              placeholder="Enter your username"
                            />
                            <p className="text-xs" style={{ color: 'red' }}>
                              {errors.email && touched.email && errors.email}
                            </p>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <Field
                              type="password"
                              id="password"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              className="form-control bg-black text-white"
                              placeholder="Enter your password"
                            />
                            <p className="text-xs" style={{ color: 'red' }}>
                              {errors.password && touched.password && errors.password}
                            </p>
                          </div>
                          <button type="submit" className="btn btn-primary">Login</button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                  <p className="text-white mt-3">
                    Don't have an account yet? <a href="/signup" className="text-info">Register here</a>
                  </p>
                  <div className="frame" style={{ marginTop: "20px" }}>
                    <button className="button bg-dark" onClick={handleClick}>
                      <span className="text">Sign in With Google</span>
                      <span className="icon-space"><FcGoogle size={24} /></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 bg-dark px-0">
              <div className="card">
                <div className="card-body" style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignIn;

