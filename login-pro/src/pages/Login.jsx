import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (!result.ok) setError(result.error);
  };

  return (
    <div className="page">
      <div className="blob blob1" />
      <div className="blob blob2" />
      <div className="blob blob3" />

      <form className="card" onSubmit={handleSubmit}>
        <h2 className="brand">Login Pro</h2>
        <h3>Login</h3>

        <label>Email</label>
        <input
          type="email"
          placeholder="username@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <div className="pass">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={() => setShow(!show)}>{show ? "🙈" : "👁"}</span>
        </div>

        <a href="#" className="forgot">Forgot Password?</a>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="signin">Sign in</button>

        <p className="or">or continue with</p>
        <div className="socials">
          <button type="button"><FcGoogle /></button>
          <button type="button"><FaGithub /></button>
          <button type="button"><FaFacebook color="#1877f2" /></button>
        </div>

        <p className="register">
          Don't have an account yet? <b>Register for free</b>
        </p>
      </form>
    </div>
  );
}