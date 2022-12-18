import React, { useContext, useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../useContext";

const Register = (props) => {
  const userContext = useContext(UserContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      dateOfBirth: "",
      gender: "",
      country: [],
      receiveNewsLetter: false,
    },
  });

  const countries = [
    { id: 1, countryName: "Iran" },
    { id: 2, countryName: "Indian" },
    { id: 3, countryName: "Usa" },
    { id: 4, countryName: "Uk" },
    { id: 5, countryName: "Brazil" },
    { id: 6, countryName: "Japan" },
    { id: 7, countryName: "France" },
    { id: 8, countryName: "Canada" },
  ];

  useEffect(() => {
    document.title = "Register";
  }, []);

  const registerHandler = async (data, e) => {
    let response = await fetch("http://localhost:5001/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.ok) {
      let responseBody = response.json();
      userContext.dispatch({
        type: "login",
        payload: {
          currentUserId: data.id,
          currentUserName: data.fullName,
        },
      });
      navigate("/dashboard");
    }

    e.target.reset();
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto my-auto  lg:py-0">
        <a
          href="#"
          className="flex items-center mt-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Register Page
        </a>
        <div className="bg-red-400 rounded-md text-slate-800 my-8 w-[450px] flex flex-col items-center text-lg"></div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Enter Your Information
            </h1>

            {/* Main Inputs of Login */}
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(registerHandler)}
            >
              {/* Email */}
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
              {/* Password */}
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

              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Full Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("fullName", {
                    required: "enter your full name",
                  })}
                />
                {errors.fullName && (
                  <p className="text-red-900 my-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="">
                <label
                  htmlFor="dateOfBirth"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  placeholder="Your Birth Date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("dateOfBirth", {
                    required: "Select your date of birth",
                  })}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-900 my-1">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div className="w-full flex flex-col items-center justify-between">
                <label htmlFor="gender" className="">
                  <h1 className="dark:text-gray-300 mb-4 text-xl">
                    Select Your Gender Type
                  </h1>
                </label>

                {/* Gender Of Male */}
                <div className="flex items-center justify-center h-6 w-1/2">
                  <label htmlFor="male" className="dark:text-gray-300 mr-6">
                    Male
                  </label>
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    placeholder="Your Gender"
                    className="bg-gray-50 border mr-8 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={"male"}
                    {...register("gender")}
                  />
                </div>

                {/* Gender of Female */}
                <div className="flex items-center w-1/2  h-6">
                  <label htmlFor="female" className="dark:text-gray-300">
                    Female
                  </label>
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    placeholder="Your Gender"
                    className="bg-gray-50 border mr-6 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={"female"}
                    {...register("gender", {
                      required: "Select your gender",
                    })}
                  />
                </div>
                {errors.gender && (
                  <p className="text-red-900 my-1">{errors.gender.message}</p>
                )}
              </div>

              {/* Country */}
              <div className="flex justify-center">
                <div className="mb-3 xl:w-96">
                  <label
                    htmlFor="country"
                    className="text-black dark:text-white"
                  >
                    Country
                  </label>
                  <select
                    className="form-select appearance-none block w-full mt-2 px-3 py-1.5 text-base font-normal  text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="country"
                    name={"country"}
                    {...register("country", {
                      required: "Select your country",
                    })}
                  >
                    <option>Please Select Your country</option>
                    {countries.map((country) => (
                      <option key={country.id}>{country.countryName}</option>
                    ))}
                  </select>
                  {errors.country && (
                    <p className="text-red-900 my-1">
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>

              {/* News Letters */}
              <div className="flex justify-center items-center">
                <label
                  htmlFor="receiveNewsLetter"
                  className="dark:text-gray-300"
                >
                  News Letters
                </label>
                <input
                  type="checkbox"
                  name="receiveNewsLetter"
                  id="receiveNewsLetter"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={true}
                  {...register("receiveNewsLetter")}
                />
              </div>

              {/* Footer of the Login */}
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded  bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
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
                // onClick={onSubmitHandler}
              >
                Sign Up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account please{" "}
                <Link
                  to={"/"}
                  className="font-semibold text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
