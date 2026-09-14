import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./AccountFeatures.module.css";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { validateEmail, validatePassword } from "../utils/ValidateCredentials";
import { useAuth } from "../hooks/useAuth";

async function deleteUser(credentials) {
  const response = await fetch("http://localhost:8080/user/delete", {
    credentials: "include",
    method: "DELETE",
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

export default function DeleteAccountModal({ showModal, children, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState();
  const { logout } = useAuth();

  const handleSubmitDelete = async (e) => {
    e.preventDefault();

    const eError = validateEmail(email);
    const pError = validatePassword(password);
    setEmailError(eError);
    setPasswordError(pError);

    if (!emailError && !passwordError) {
      setLoading(true);

      try {
        await deleteUser({
          email,
          password,
        });
        logout();
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

  if (!showModal) return null;

  return createPortal(
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <h1
          style={{
            paddingLeft: "1rem",
            paddingRight: "1rem",
            marginTop: 0,
            marginBottom: "2rem",
          }}
        >
          Delete account?
        </h1>
        <form className={styles.modalForm} onSubmit={handleSubmitDelete}>
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
            <p className={styles.text}>Password:</p>
            <div className={styles.passwordContainer}>
              <input
                required
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
          <p style={{ alignSelf: "center", marginBottom: "0.5rem" }}>
            This action is permanent.
          </p>
          <div className={styles.modalButtons}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.deleteButton}>
              {loading ? "Loading..." : "Delete"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
