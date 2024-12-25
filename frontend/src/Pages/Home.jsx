import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-white h-dvh">
      <header className=" p-3 pl-7 bg- shadow-xl flex justify-between">
        <p className="text-2xl text-sky-200 bg-blue-900  align self-center">
          Paytm
        </p>
        <div className="text-xl flex justify-end mx-10 content-center">
          <Link className="mx-5 p-2.5 rounded-full bg-sky-400" to="/signup">
            Signup
          </Link>
          <Link className="mx-5 p-2.5 rounded-full bg-sky-300" to="/signin">
            Signin
          </Link>
        </div>
      </header>
      <hr />
    </div>
  );
};

export default Home;
