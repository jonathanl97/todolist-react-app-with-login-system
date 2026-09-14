import { useState } from "react";
import styles from "./SignIn.module.css";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { validateEmail, validatePassword } from "../utils/ValidateCredentials";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

async function signinUser(credentials) {
  const response = await fetch("http://localhost:8080/signin", {
    credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const jsonResponse = await response.json();

  if (!response.ok) {
    alert(jsonResponse);
  }
}

async function registerUser(credentials) {
  const response = await fetch("http://localhost:8080/register", {
    credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const jsonResponse = await response.json();

  if (!response.ok) {
    alert(jsonResponse);
  }
}

export default function Signin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState();
  const [touched, setTouched] = useState();
  const [newUser, setNewUser] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { state } = useLocation();

  const handleSubmitSignin = async (e) => {
    e.preventDefault();

    const eError = validateEmail(email);
    const pError = validatePassword(password);
    setEmailError(eError);
    setPasswordError(pError);

    if (!emailError && !passwordError) {
      setLoading(true);
      try {
        await signinUser({
          email,
          password,
        });
        await login();
        navigate(state?.path || "/");
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    const eError = validateEmail(email);
    const pError = validatePassword(password);
    setEmailError(eError);
    setPasswordError(pError);

    if (!emailError && !passwordError) {
      setLoading(true);
      try {
        await registerUser({
          name,
          email,
          password,
        });
        await login();
        navigate(state?.path || "/");
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEmailBlur = () => {
    setTouched(true);
    const error = validateEmail(email);
    setEmailError(error);
  };

  const handlePasswordBlur = () => {
    setTouched(true);
    const error = validatePassword(password);
    setPasswordError(error);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (touched) {
      const error = validateEmail(value);
      setEmailError(error);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (touched) {
      const error = validatePassword(value);
      setPasswordError(error);
    }
  };

  return (
    <div className={styles.box}>
      <div className={styles.formContainer}>
        <h1 className={styles.header}>{newUser ? "Register" : "Sign in"}</h1>
        <form
          className={styles.form}
          onSubmit={newUser ? handleSubmitRegister : handleSubmitSignin}
        >
          {newUser && (
            <label className={styles.label}>
              <p className={styles.text}>Name:</p>
              <input
                required
                className={styles.inputAreaName}
                type="text"
                placeholder="John Doe"
                maxLength={32}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
              {/*Just for equal spacing*/}
              <div className={styles.errorText}></div>
            </label>
          )}

          <label className={styles.label}>
            <p className={styles.text}>Email:</p>
            <input
              required
              className={styles.inputAreaEmail}
              type="text"
              placeholder="example@email.com"
              maxLength={51}
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              disabled={loading}
            />
            {touched && emailError ? (
              <div className={styles.errorText}>{emailError}</div>
            ) : (
              <div className={styles.errorText}></div>
            )}
          </label>

          <label className={styles.label}>
            <p className={styles.text}>Password:</p>
            <div className={styles.passwordContainer}>
              <input
                required
                className={styles.inputAreaPassword}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                maxLength={51}
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                disabled={loading}
              />
              <button
                className={styles.showPasswordButton}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
              </button>
            </div>
            {touched && passwordError ? (
              <div className={styles.errorText}>{passwordError}</div>
            ) : (
              <div className={styles.errorText}></div>
            )}
          </label>
          <div className={styles.formButtons}>
            <button className={styles.button} type="submit" disabled={loading}>
              {newUser ? "Register" : "Sign in"}
            </button>
            <button
              className={styles.linkButton}
              type="button"
              onClick={() => setNewUser(!newUser)}
            >
              {newUser ? "Already have an account?" : "Create an account?"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
