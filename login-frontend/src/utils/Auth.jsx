import { useState, useEffect } from "react";
import { AuthContext } from "../hooks/useAuth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: null,
    firstName: null,
    email: null,
    signedIn: null,
  });

  useEffect(() => {
    login();
  }, []);

  const login = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/getuser", {
        credentials: "include",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const jsonResponse = await response.json();
      setUser(jsonResponse);
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setUser({ name: null, firstName: null, email: null, signedIn: false });
    localStorage.removeItem("showArchive");
  };

  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;
};
