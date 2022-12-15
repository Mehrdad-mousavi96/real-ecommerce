import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { UserContext } from "../useContext";

const Login = (props) => {
  const userContext = useContext(UserContext);
  const [loginMsg, setLoginMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "sara@gmail.com",
      password: "Sara123",
    },
  });

  const loginHandler = async (data) => {
    let response = await fetch(
      `http://localhost:5001/users?email=${data.email}&password=${data.password}`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      let responseBody = await response.json();
      if (responseBody.length > 0) {
        userContext.dispatch({
          type: "login",
          payload: {
            currentUserId: responseBody[0].id,
            currentUserName: responseBody[0].fullName,
          },
        });
        props.history.replace("/dashboard");
      } else {
        setLoginMsg("Invalid info, please try again");
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Login Page
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-semibold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>

            {/* Main Inputs of Login */}
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(loginHandler)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Enter your email address",
                    },
                    pattern: {
                      value: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
                      message: "Your email format is invalid",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-900 my-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password", {
                    required: { value: true, message: "Enter your password" },
                    pattern: {
                      value: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/,
                      message: "Your password format is invalid",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-900 my-1">{errors.password.message}</p>
                )}
              </div>

              {/* Footer of the Login */}
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full hover:bg-slate-900 hover:text-white duration-300 border dark:border-white dark:hover:bg-white dark:hover:text-slate-900 border-slate-900 dark:text-white dark:bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>

              {loginMsg && (
                <p className="w-full text-center text-red-900">{loginMsg}</p>
              )}

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to={"/register"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
