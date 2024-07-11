import React from "react";
import { useState } from "react";
import "./SignUp.css";
import { NavLink, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate=useNavigate()
  const [signUpDetails, setSignUpDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const emailHandler = (e) => {
    setSignUpDetails({ ...signUpDetails, ["email"]: e.target.value });
  };
  const passwordHandler = (e) => {
    setSignUpDetails({ ...signUpDetails, ["password"]: e.target.value });
  };
  const confirmPasswordHandler = (e) => {
    setSignUpDetails({ ...signUpDetails, ["confirmPassword"]: e.target.value });
  };

  const NameHandler = (e) => {
    setSignUpDetails({ ...signUpDetails, ["name"]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate('/login')
    if (signUpDetails.password === signUpDetails.confirmPassword) {
      console.log(signUpDetails);
      fetch("http://localhost:5000/authentication/user/sign-up", {
        method: "POST",
        body: JSON.stringify({
          name: signUpDetails.name,
          email: signUpDetails.email,
          password: signUpDetails.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          
        });
      setSignUpDetails({ email: '', password: '', confirmPassword: '' })
    } else {
      alert("password and confirm password are not same");
    }
  };

  return (
    <>
      <div className="">
        <h4>Sign Up</h4>
      </div>
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                <div>
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                  required
                    value={signUpDetails.name}
                    onChange={NameHandler}
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Ravi"
                    required=""
                  />
                </div>

                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                  required
                    value={signUpDetails.email}
                    onChange={emailHandler}
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                  required
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    onChange={passwordHandler}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="confirm-password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                  required
                    type="confirm-password"
                    name="confirm-password"
                    id="confirm-password"
                    onChange={confirmPasswordHandler}
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>

                <button
                  type="submit"
                  onClick={submitHandler}
                  class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create  account
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?
                  <NavLink style={{ textDecoration: "None" }} to="/login">
                    <div className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Login
                    </div>
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
