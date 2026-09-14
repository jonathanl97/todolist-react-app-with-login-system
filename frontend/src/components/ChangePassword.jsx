import { useState } from "react";
import styles from "./AccountFeatures.module.css";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { validateEmail, validatePassword } from "../utils/ValidateCredentials";

async function changePassword(credentials) {
  const response = await fetch("http://localhost:8080/user/password", {
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

export default function ChangePasswordForm() {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState();

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    const eError = validateEmail(email);
    const opError = validatePassword(oldPassword);
    const npError = validatePassword(newPassword);
    setEmailError(eError);
    setOldPasswordError(opError);
    setNewPasswordError(npError);

    if (!emailError && !oldPasswordError && !newPasswordError) {
      setLoading(true);

      try {
        await changePassword({
          newPassword,
          email,
          oldPassword,
        });
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

  const handleOldPasswordBlur = () => {
    setTouched(true);
    const error = validatePassword(oldPassword);
    setOldPasswordError(error);
  };

  const handleNewPasswordBlur = () => {
    setTouched(true);
    const error = validatePassword(newPassword);
    setNewPasswordError(error);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (touched) {
      const error = validateEmail(value);
      setEmailError(error);
    }
  };

  const handleOldPasswordChange = (e) => {
    const value = e.target.value;
    setOldPassword(value);

    if (touched) {
      const error = validatePassword(value);
      setOldPasswordError(error);
    }
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);

    if (touched) {
      const error = validatePassword(value);
      setNewPasswordError(error);
    }
  };

  return (
    <>
      <h2 style={{ marginBottom: "1rem" }}>Change password</h2>
      <form className={styles.form} onSubmit={handleSubmitPassword}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>
            <p className={styles.text}>Email:</p>
            <input
              required
              className={styles.inputArea}
              type="text"
              placeholder="example@email.com"
              maxLength={50}
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
            <p className={styles.text}>Current password:</p>
            <div className={styles.passwordContainer}>
              <input
                required
                className={styles.inputArea}
                type={showOldPassword ? "text" : "password"}
                placeholder="Password"
                maxLength={51}
                onChange={handleOldPasswordChange}
                onBlur={handleOldPasswordBlur}
                disabled={loading}
              />
              <button
                className={styles.showPasswordButton}
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <EyeIcon /> : <EyeSlashIcon />}
              </button>
            </div>
            {touched && oldPasswordError ? (
              <div className={styles.errorText}>{oldPasswordError}</div>
            ) : (
              <div className={styles.errorText}></div>
            )}
          </label>
          <label className={styles.label}>
            <p className={styles.text}>New password:</p>
            <div className={styles.passwordContainer}>
              <input
                required
                className={styles.inputArea}
                type={showNewPassword ? "text" : "password"}
                placeholder="Password"
                maxLength={51}
                onChange={handleNewPasswordChange}
                onBlur={handleNewPasswordBlur}
                disabled={loading}
              />
              <button
                className={styles.showPasswordButton}
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeIcon /> : <EyeSlashIcon />}
              </button>
            </div>
            {touched && newPasswordError ? (
              <div className={styles.errorText}>{newPasswordError}</div>
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
