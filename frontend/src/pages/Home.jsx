import styles from "./Home.module.css";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  function handleClick() {
    navigate("/signin");
  }
  return (
    <div>
      <h1 style={{ marginTop: 60, marginBottom: 40 }}>Homepage</h1>
      {user.signedIn ? (
        ""
      ) : (
        <button className={styles.button} onClick={handleClick}>
          Sign in/Register
        </button>
      )}
    </div>
  );
}
