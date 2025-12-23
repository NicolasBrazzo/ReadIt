import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Footer } from "../components/Footer";
import { Form } from "../components/Form";
import { loginInputs } from "../../constants";

export const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [result, setResult] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  // Scrivo i dati onChange
  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // Invio dei dati onSubmit
  const handleSubmit = async () => {
    setResult("");
    const res = await login(values);
    if (res.ok) {
      setResult("SUCCESS");
      navigate("/dashboard");
    } else {
      setResult(res.message);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="p-6 flex-center-col mb-10 h-[80vh]">
        <div className="line-container">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        <h1 className="text-white underline decoration-primary text-center zen-dots text-[60px] sm:text-[65px] md:text-[75px] lg:text-[80px] my-5">
          Lo<span className="text-primary">g</span>in
        </h1>

        <div className="w-full flex flex-col gap-5 mt-5 items-center">
          <Form inputs={loginInputs} onChange={handleChange} state={values} />

          <p className="comfoorta text-center text-[20px]">
            You don't have an account? <br />{" "}
            <Link
              to={"/signup"}
              className="text-blue-400 hover:text-blue-600 underline"
            >
              SignUp
            </Link>
          </p>

          <button
            onClick={handleSubmit}
            className="bg-primary text-2xl font-bold text-white px-4 py-2 mt-3 ml-3 rounded"
          >
            Login
          </button>
        </div>

        {result && (
          <div className="mt-4 ml-3 text-red-400">
            {result}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
