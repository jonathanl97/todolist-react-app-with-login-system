import { useState } from "react";
import styles from "./Account.module.css";
import DeleteAccountModal from "../components/DeleteAccount";
import ChangeEmailForm from "../components/ChangeEmail";
import ChangePasswordForm from "../components/ChangePassword";
import { useAuth } from "../hooks/useAuth";

async function signOutUser() {
  await fetch("http://localhost:8080/signout", {
    credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export default function Account() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { logout } = useAuth();

  const handleSignOut = async () => {
    setLoading(true);

    try {
      await signOutUser();
      logout();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.accountSettings}>
      <div className={styles.headerContainer}>
        <h1>Account</h1>
        <h1>{user.signedIn ? "Hello " + user.firstName : ""}</h1>
        <button className={styles.signOutButton} onClick={handleSignOut}>
          {loading ? "Loading..." : "Sign out"}
        </button>
      </div>
      <div className={styles.accountSectionsContainer}>
        <div className={styles.userInfoContainer}>
          <p className={styles.userText}>Name:</p>
          <p>{user.signedIn ? user.name : ""}</p>
        </div>
        <div className={styles.userInfoContainer}>
          <p className={styles.userText}>Email:</p>
          <p>{user.signedIn ? user.email : ""}</p>
        </div>
      </div>
      <div className={styles.accountSectionsContainer}>
        <ChangeEmailForm />
      </div>

      <div className={styles.accountSectionsContainer}>
        <ChangePasswordForm />
      </div>

      <div className={styles.deleteAccountContainer}>
        <h2>Account Deletion</h2>
        <div className={styles.deleteAccount}>
          <p>Delete account?</p>
          <button
            className={styles.deleteButton}
            onClick={() => setShowModal(true)}
          >
            Delete
          </button>
          <DeleteAccountModal
            showModal={showModal}
            onClose={() => setShowModal(false)}
          />
        </div>
      </div>
    </div>
  );
}
