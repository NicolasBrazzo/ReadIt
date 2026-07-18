import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
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
    <div className="flex-1 lg:grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center gap-6 bg-surface-2 px-16 relative overflow-hidden">
        <div className="circle w-16 h-16 absolute -top-8 -left-8 opacity-80"></div>
        <h2 className="font-black text-text text-6xl tracking-tight relative">
          Read<span className="text-accent">-It</span>
        </h2>
        <p className="text-text-2 text-lead max-w-sm relative">
          Create your account and start turning every book you open into
          tracked, visible progress.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
        <div className="w-full max-w-[500px] flex flex-col gap-6">
          <h1 className="text-display text-text">
            <span className="text-accent">S</span>ign
            <span className="text-accent">U</span>p
          </h1>

          <Form inputs={signupInputs} onChange={handleChange} state={values} />

          {result && result !== "SUCCESS" && (
            <Alert kind="err" title={result}>
              {errorDetails.length > 0 && (
                <ul className="mt-1 list-disc list-inside">
                  {errorDetails.map((error, index) => (
                    <li key={index} className="text-[13px]">{error}</li>
                  ))}
                </ul>
              )}
            </Alert>
          )}

          <Button onClick={handleSubmit} loading={loading} size="lg" className="w-full">
            SignUp
          </Button>

          <p className="text-center text-[15px] text-text-2">
            You just have an account?{" "}
            <Link
              to={"/login"}
              className="text-accent hover:text-accent-deep underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
