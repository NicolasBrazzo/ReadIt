import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Footer } from "../components/Footer";
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
    <div>
      <Navbar />

      <div className="p-6 flex-center-col mb-10 min-h-[80vh]">
        <h1 className="text-display text-text text-center my-5">
          Lo<span className="text-accent">g</span>in
        </h1>

        <div className="w-full flex flex-col gap-5 mt-5 items-center">
          <Form inputs={loginInputs} onChange={handleChange} state={values} />

          <p className="text-center text-[16px] text-text-2">
            You don't have an account? <br />{" "}
            <Link
              to={"/signup"}
              className="text-accent hover:text-accent-deep underline"
            >
              SignUp
            </Link>
          </p>

          <Button onClick={handleSubmit} loading={loading} size="lg">
            Login
          </Button>
        </div>

        {result && result !== "SUCCESS" && (
          <div className="mt-4 w-full max-w-[500px]">
            <Alert kind="err">{result}</Alert>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
