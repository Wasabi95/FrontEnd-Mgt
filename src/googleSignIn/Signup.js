//Signup.js
//Signup.js
//Signup.js
//Signup.js
//Signup.js
//Signup.js
import React, {  useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { Formik, Field, Form } from 'formik';
import img from './images/img.jpg'


const Signup = () => {
    const navigate = useNavigate();

    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility


    


    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    }

    const validateForm = (values) => {
        const errors = {};

        if (!values.firstName) {
            errors.firstName = "First name is required";
        } else if (values.firstName.length <= 3) {
            errors.firstName = 'Must be 3 characters or more';
        }

        if (!values.lastName) {
            errors.lastName = "Last name is required";
        } else if (values.lastName.length <= 3) {
            errors.lastName = 'Must be 3 characters or more';
        }

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

        if (values.password !== values.confirmPassword) {
            errors.password = "Password does not match!";
        }

        return errors;
    }

    const onSubmitSignupForm = async (values) => {
        setLoading(true);
        await createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in 
                setLoading(false);
                const user = userCredential.user;
                console.log(user);
                navigate("/")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrors(errorMessage);
                setLoading(false);
                console.log(errorCode, errorMessage);
                // ..
            });

            

        await updateProfile(auth.currentUser, {
            displayName: `${values.firstName} ${values.lastName}`,
        }).then(() => {
            console.log("updated successfully");
        }).catch((error) => {
            console.log("error updating name");
            console.log(error);
        })
    }
   
   
        // Function to toggle password visibility
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };

  return (
      <div className="container-fluid" style={{ height: "100vh", overflow: "hidden" }}>
          <div className="row">
              <div className="col-md-6 bg-dark d-flex align-items-center justify-content-center">
                  <div className="md:w-4/5 mx-auto">
                      <div className="card-body bg-dark">
                          <div className="px-10">
                              <div className="text-center">
                                  <h2 className="text-2xl text-white font-bold mb-2">
                                      <NavLink className="navbar-brand" to="/">
                                          <img
                                              style={{ width: "10%", marginLeft: "20px" }}
                                              src="https://raw.githubusercontent.com/Wasabi95/NavBar-SideMenu/master/images/cc.png"
                                              alt="logo"
                                          ></img>
                                          Wasabi <span className="text-info font-bold">TECHNOLOGIES</span>
                                      </NavLink>
                                  </h2>
                              </div>
                          </div>
                          <h2 className="text-white text-center text-sm md:text-xs tracking-tight text-gray-900">
                              Are you new? Sign up today
                          </h2>
                      </div>

                      <div className="mt-4 text-xs" style={{ color: 'red' }}>
                          {errors && errors}
                      </div>

                      <Formik
                          initialValues={initialValues}
                          validate={validateForm}
                          onSubmit={(values) => onSubmitSignupForm(values)}
                      >
                          {(formikProps) => (
                              <Form className="mt-8 space-y-6">
                                  <div className="space-y-6 rounded-md shadow-sm">
                                      <div className="mb-3">
                                          <label htmlFor="firstName" className="form-label">
                                              First name
                                          </label>
                                          <Field
                                              type="text"
                                              id="firstName"
                                              name="firstName"
                                              value={formikProps.values.firstName}
                                              onChange={formikProps.handleChange}
                                              className="form-control bg-white text-black"
                                              placeholder="First name"
                                          />
                                          <p className="text-xs" style={{ color: 'red' }}>
                                              {formikProps.errors.firstName && formikProps.touched.firstName && formikProps.errors.firstName}
                                          </p>
                                      </div>
                                      <div className="mb-3">
                                          <label htmlFor="lastName" className="form-label">
                                              Last name
                                          </label>
                                          <Field
                                              type="text"
                                              id="lastName"
                                              name="lastName"
                                              value={formikProps.values.lastName}
                                              onChange={formikProps.handleChange}
                                              className="form-control bg-white text-black"
                                              placeholder="Last name"
                                          />
                                          <p className="text-xs" style={{ color: 'red' }}>
                                              {formikProps.errors.lastName && formikProps.touched.lastName && formikProps.errors.lastName}
                                          </p>
                                      </div>
                                      <div className="mb-3">
                                          <label htmlFor="email" className="form-label">
                                              Email address
                                          </label>
                                          <Field
                                              type="email"
                                              id="email"
                                              name="email"
                                              value={formikProps.values.email}
                                              onChange={formikProps.handleChange}
                                              className="form-control bg-white text-black"
                                              placeholder="Email address"
                                          />
                                          <p className="text-xs" style={{ color: 'red' }}>
                                              {formikProps.errors.email && formikProps.touched.email && formikProps.errors.email}
                                          </p>
                                      </div>
                                      <div className="mb-3">
                                          <label htmlFor="password" className="form-label">
                                              Password
                                          </label>
                                          <div className="input-group">
                                              <Field
                                                  type={showPassword ? "text" : "password"} // Toggle password visibility
                                                  id="password"
                                                  name="password"
                                                  value={formikProps.values.password}
                                                  onChange={formikProps.handleChange}
                                                  className="form-control bg-white text-black"
                                                  placeholder="Password"
                                                 
                                                  />
                                              <button
                                                  className="btn btn-outline-secondary"
                                                  type="button"
                                                  onClick={togglePasswordVisibility} // Toggle password visibility when clicked                                                 
                                                  
                                              >
                                                  {showPassword ? "Hide" : "Show"}
                                              </button>
                                          </div>
                                          <p className="text-xs" style={{ color: 'red' }}>
                                              {formikProps.errors.password && formikProps.touched.password && formikProps.errors.password}
                                          </p>
                                      </div>
                                      <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">
                                            Confirm Password
                                        </label>
                                        <div className="input-group">
                                            <Field
                                                type={showConfirmPassword ? "text" : "password"} // Toggle password visibility
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                value={formikProps.values.confirmPassword}
                                                onChange={formikProps.handleChange}
                                                className="form-control bg-white text-black"
                                                placeholder="Confirm Password"
                                            />
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? "Hide" : "Show"}
                                            </button>
                                            </div>
                                        </div>

                                      <button
                                          type="submit"
                                          className="btn btn-primary w-full"
                                          disabled={loading}
                                      >
                                          {loading ? 'Creating Account ...' : 'Sign up'}
                                      </button>
                                  </div>
                              </Form>
                          )}
                      </Formik>

                      <p className="mt-10 text-sm text-white text-center">
                          Already have an account?{' '}
                          <NavLink to="/" className="underline text-tertiary">
                              Sign in
                          </NavLink>
                      </p>
                  </div>
              </div>

              <div className="col-md-6 bg-dark px-0">
                  <div className="card">
                      <div className="card-body" style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh' }}></div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Signup;