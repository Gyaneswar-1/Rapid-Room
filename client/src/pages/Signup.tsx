import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import { z } from "zod";

import { useForm, SubmitHandler } from "react-hook-form";
import { signupTypeFrontend } from "@bibek-samal/traveltrove";

function Signin() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<signupTypeFrontend>();

  //here you get the data
  const onSubmit: SubmitHandler<signupTypeFrontend> = (data) => {
    console.log(data);
    alert("hell yeah");
  };

  const password = watch("password");
  return (
    <Layout>
      <section className="bg-gray-50 dark:bg-gray-900 max-h-screen-xl">
        <div className=" px-4 mx-auto py-4 lg:py-6 grid place-items-center gap-8 lg:gap-16">
          <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Sign up to TraveTrove
            </h2>
            <form className="mt-8 space-y-2" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your email@gmail.com"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                      message: "Email must end with @gmail.com",
                    },
                  })}
                />
                <p className="h-6 text-error text-sm font-thin pl-2.5">
                  {errors.email && errors.email.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your name"
                  {...register("fullName", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                />
                <p className="h-6 text-error text-sm font-thin pl-2.5">
                  {errors.fullName && errors.fullName.message}
                </p>
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
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password cannot be empth",
                    },
                    minLength: {
                      value: 8,
                      message: "Password is too sort",
                    },
                  })}
                />
                <p className="h-6 text-error text-sm font-thin pl-2.5">
                  {errors.password && errors.password.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="conformPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Conform password
                </label>
                <input
                  type="password"
                  id="conformPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("conformPassword", {
                    required: {
                      value: true,
                      message: "Password do not mathch",
                    },
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                <p className="h-6 text-error text-sm font-thin pl-2.5">
                  {errors.conformPassword && errors.conformPassword.message}
                </p>
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file_input"
                >
                  Upload profile picture
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                  {...register("ProfilePhoto", {
                    validate: {
                      fileType: (value: any) => {
                        if (!value || value.length === 0) {
                          return true;
                        }

                        const file = value[0];
                        return (
                          (file &&
                            (file.type === "image/jpeg" ||
                              file.type === "image/png" ||
                              file.type === "image/jpg")) ||
                          "Only .jpg/.jpeg or .png files are allowed"
                        );
                      },
                      fileSize: (value: any) => {
                        if (!value || value.length === 0) {
                          return true;
                        }
                        const file = value[0];
                        return (
                          (file && file.size <= 1 * 1024 * 1024) ||
                          "File size must be under 1MB"
                        );
                      },
                    },
                  })}
                />
                <p className="h-6 text-sm  text-error font-thin pl-2.5"></p>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    name="remember"
                    type="checkbox"
                    className="w-4 h-4 border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
                <div className="ms-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="font-medium text-gray-500 dark:text-gray-400"
                  >
                    Remember this device
                  </label>
                </div>
              </div>
              <input
                type="submit"
                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              />

              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Already have an account?{" "}
                <NavLink
                  to="/signin"
                  className="text-blue-600 hover:underline dark:text-blue-500 cursor-pointer"
                >
                  sign in
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Signin;
