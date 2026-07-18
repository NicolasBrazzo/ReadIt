import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Form } from "../components/Form";
import { loginInputs } from "../../constants";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";

export const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // Scrivo i dati onChange
  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // Invio dei dati onSubmit
  const handleSubmit = async () => {
    setResult("");
    setLoading(true);
    const res = await login(values);
    setLoading(false);
    if (res.ok) {
      setResult("SUCCESS");
      navigate("/dashboard");
    } else {
      setResult(res.message);
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
          Track what you read, keep your progress in one place, and turn
          reading into a habit that sticks.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
        <div className="w-full max-w-[500px] flex flex-col gap-6">
          <h1 className="text-display text-text">
            Lo<span className="text-accent">g</span>in
          </h1>

          <Form inputs={loginInputs} onChange={handleChange} state={values} />

          {result && result !== "SUCCESS" && <Alert kind="err">{result}</Alert>}

          <Button onClick={handleSubmit} loading={loading} size="lg" className="w-full">
            Login
          </Button>

          <p className="text-center text-[15px] text-text-2">
            You don't have an account?{" "}
            <Link
              to={"/signup"}
              className="text-accent hover:text-accent-deep underline"
            >
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
