import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Footer } from "../components/Footer";
import { Form } from "../components/Form";
import { signupInputs } from "../../constants";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";

export const SignUp = () => {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [result, setResult] = useState("");
  const [errorDetails, setErrorDetails] = useState([]);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    const res = await register(values);
    setLoading(false);

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
      <div className="p-6 flex-center-col mb-10 min-h-screen">
        <h1 className="text-display text-text text-center my-5">
          <span className="text-accent">S</span>ign
          <span className="text-accent">U</span>p
        </h1>
        <div className="w-full flex flex-col gap-10 mt-5 items-center">
          <Form inputs={signupInputs} onChange={handleChange} state={values} />
          <p className="text-center text-[16px] text-text-2">
            You just have an account? <br />{" "}
            <Link
              to={"/login"}
              className="text-accent hover:text-accent-deep underline"
            >
              Login
            </Link>
          </p>
          <Button onClick={handleSubmit} loading={loading} size="lg">
            SignUp
          </Button>
        </div>
        {result && result !== "SUCCESS" && (
          <div className="mt-4 w-full max-w-[500px]">
            <Alert kind="err" title={result}>
              {errorDetails.length > 0 && (
                <ul className="mt-1 list-disc list-inside">
                  {errorDetails.map((error, index) => (
                    <li key={index} className="text-[13px]">{error}</li>
                  ))}
                </ul>
              )}
            </Alert>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
