import { useState } from "react";
import { createPortal } from "react-dom";
import * as Todo from "../utils/TodoListFetch";

export default function CreateTodoModal() {
  if (!showModal) return null;

  return createPortal(
    <div>
      <form></form>
    </div>,
    document.body,
  );
}
