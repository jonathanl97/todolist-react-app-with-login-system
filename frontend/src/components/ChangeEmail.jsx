import { useState } from "react";
import styles from "./AccountFeatures.module.css";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { validateEmail, validatePassword } from "../utils/ValidateCredentials";

async function changeEmail(credentials) {
  const response = await fetch("http://localhost:8080/user/email", {
    credentials: "include",
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const jsonResponse = await response.json();

  alert(jsonResponse);
}

export default function ChangeEmailForm() {
  const [oldEmail, setOldEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldEmailError, setOldEmailError] = useState("");
  const [newEmailError, setNewEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState();

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    const oeError = validateEmail(oldEmail);
    const neError = validateEmail(newEmail);
    const pError = validatePassword(password);
    setOldEmailError(oeError);
    setNewEmailError(neError);
    setPasswordError(pError);

    if (!oldEmailError && !newEmailError && !passwordError) {
      setLoading(true);

      try {
        await changeEmail({
          newEmail,
          oldEmail,
          password,
        });
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOldEmailBlur = () => {
    setTouched(true);
    const error = validateEmail(oldEmail);
    setOldEmailError(error);
  };

  const handleNewEmailBlur = () => {
    setTouched(true);
    const error = validateEmail(newEmail);
    setNewEmailError(error);
  };

  const handlePasswordBlur = () => {
    setTouched(true);
    const error = validatePassword(password);
    setPasswordError(error);
  };

  const handleOldEmailChange = (e) => {
    const value = e.target.value;
    setOldEmail(value);

    if (touched) {
      const error = validateEmail(value);
      setOldEmailError(error);
    }
  };

  const handleNewEmailChange = (e) => {
    const value = e.target.value;
    setNewEmail(value);

    if (touched) {
      const error = validateEmail(value);
      setNewEmailError(error);
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
    <>
      <h2 style={{ marginBottom: "1rem" }}>Change email adress</h2>
      <form className={styles.form} onSubmit={handleSubmitEmail}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>
            <p className={styles.text}>Current email:</p>
            <input
              className={styles.inputArea}
              type="text"
              placeholder="example@email.com"
              maxLength={50}
              onChange={handleOldEmailChange}
              onBlur={handleOldEmailBlur}
              disabled={loading}
            />
            {touched && oldEmailError ? (
              <div className={styles.errorText}>{oldEmailError}</div>
            ) : (
              <div className={styles.errorText}></div>
            )}
          </label>
          <label className={styles.label}>
            <p className={styles.text}>New email:</p>
            <input
              className={styles.inputArea}
              type="text"
              placeholder="example@email.com"
              maxLength={50}
              onChange={handleNewEmailChange}
              onBlur={handleNewEmailBlur}
              disabled={loading}
            />
            {touched && newEmailError ? (
              <div className={styles.errorText}>{newEmailError}</div>
            ) : (
              <div className={styles.errorText}></div>
            )}
          </label>
          <label className={styles.label}>
            <p className={styles.text}>Password:</p>
            <div className={styles.passwordContainer}>
              <input
                className={styles.inputArea}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                maxLength={51}
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
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} type="submit">
            {loading ? "Loading..." : "Confirm"}
          </button>
        </div>
      </form>
    </>
  );
}
