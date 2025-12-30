import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Footer } from "../components/Footer";
import { Form } from "../components/Form";
import { signupInputs } from "../../constants";

export const SignUp = () => {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [result, setResult] = useState("");
  const [errorDetails, setErrorDetails] = useState([]);
  const navigate = useNavigate();
  const { register } = useAuth();

  // Scrivo i dati onChange
  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // Invio dei dati onSubmit
  const handleSubmit = async () => {
    setResult("");
    setErrorDetails([]);
    
    const res = await register(values);
    
    if (res.ok) {
      setResult("SUCCESS");
      navigate("/dashboard");
    } else {
      setResult(res.message || "Registration failed");
      // Se ci sono dettagli degli errori di validazione password
      if (res.details && Array.isArray(res.details)) {
        setErrorDetails(res.details);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 flex-center-col mb-10 h-screen">
        <div className="line-container">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <h1 className="text-white underline decoration-primary text-center zen-dots text-[60px] sm:text-[65px] md:text-[75px] lg:text-[80px] my-5">
          <span className="text-primary">S</span>ign
          <span className="text-primary">U</span>p
        </h1>
        <div className="w-full flex flex-col gap-10 mt-5 items-center">
          <Form inputs={signupInputs} onChange={handleChange} state={values} />
          <p className="comfoorta text-center text-[20px]">
            You just have an account? <br />{" "}
            <Link
              to={"/login"}
              className="text-blue-400 hover:text-blue-600 underline"
            >
              Login
            </Link>
          </p>
          <button
            onClick={handleSubmit}
            className="bg-primary text-2xl font-bold text-white px-4 py-2 mt-3 ml-3 rounded"
          >
            SignUp
          </button>
        </div>
        {result && (
          <div className="mt-4 ml-3 text-red-400">
            <p className="font-bold">{result}</p>
            {errorDetails.length > 0 && (
              <ul className="mt-2 list-disc list-inside">
                {errorDetails.map((error, index) => (
                  <li key={index} className="text-sm">{error}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};