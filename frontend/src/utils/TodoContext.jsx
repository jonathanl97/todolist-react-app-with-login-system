import { createContext, useState } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todoLists, setTodoLists] = useState([]);

  const fetchLists = async () => {
    const response = await fetch("http://localhost:8080/todo/getlists", {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });

    const jsonResponse = await response.json();
    setTodoLists(jsonResponse);
  };

  const todoFetch = async (action, method, body) => {
    const response = await fetch("http://localhost:8080/todo/" + action, {
      credentials: "include",
      method: method,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const jsonResponse = await response.json();
    setTodoLists(jsonResponse);
  };

  return (
    <TodoContext value={{ todoLists, fetchLists, todoFetch }}>
      {children}
    </TodoContext>
  );
};
