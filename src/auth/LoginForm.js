import React from "react";

const LoginForm = () => {
  return (
    <div className="font-sans text-lg  bg-gray-200 min-h-screen flex items-center flex-col">
      <div className="w-full max-w-sm  px-5 flex items-center flex-col justify-center">
        <img
          className="rounded shadow-lg"
          src="https://images.unsplash.com/photo-1515965885361-f1e0095517ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80"
          alt=""
        />
        <p className="text-xl text-bold font-pop uppercase">Login to your account</p>
        <form>
          <div className="rounded-md shadow-sm">
            <input
              className="relative block w-full px-3 py-2 border border-gray-300 rounded focus:shadow-outline focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              type="email"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <input
              className="relative block w-full px-3 py-2 border border-gray-300 rounded focus:shadow-outline focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="flex justify-between items-center">
            <button className="bg-gray-700 hover:bg-blue-700  text-center py-2 px-4 m-2 rounded text-white inline-flex w-full items-center">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
