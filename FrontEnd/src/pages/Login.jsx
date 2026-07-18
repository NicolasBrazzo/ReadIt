import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Form } from "../components/Form";
import { AuthLayout } from "../components/AuthLayout";
import { loginInputs } from "../../constants";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";

export const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    const res = await login(values);
    setLoading(false);
    if (res.ok) {
      navigate("/dashboard");
    } else {
      setError(res.message);
    }
  };

  return (
    <AuthLayout tagline="Track what you read, keep your progress in one place, and turn reading into a habit that sticks.">
      <h1 className="text-display text-text">
        Lo<span className="text-accent">g</span>in
      </h1>

      <Form inputs={loginInputs} onChange={handleChange} state={values} />

      {error && <Alert kind="err">{error}</Alert>}

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
    </AuthLayout>
  );
};
