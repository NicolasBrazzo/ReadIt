import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Form } from "../components/Form";
import { AuthLayout } from "../components/AuthLayout";
import { signupInputs } from "../../constants";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";

export const SignUp = () => {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [errorDetails, setErrorDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError("");
    setErrorDetails([]);
    setLoading(true);

    const res = await register(values);
    setLoading(false);

    if (res.ok) {
      navigate("/dashboard");
    } else {
      setError(res.message || "Registration failed");
      if (res.details && Array.isArray(res.details)) {
        setErrorDetails(res.details);
      }
    }
  };

  return (
    <AuthLayout tagline="Create your account and start turning every book you open into tracked, visible progress.">
      <h1 className="text-display text-text">
        <span className="text-accent">S</span>ign
        <span className="text-accent">U</span>p
      </h1>

      <Form inputs={signupInputs} onChange={handleChange} state={values} />

      {error && (
        <Alert kind="err" title={error}>
          {errorDetails.length > 0 && (
            <ul className="mt-1 list-disc list-inside">
              {errorDetails.map((detail, index) => (
                <li key={index} className="text-[13px]">{detail}</li>
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
    </AuthLayout>
  );
};
