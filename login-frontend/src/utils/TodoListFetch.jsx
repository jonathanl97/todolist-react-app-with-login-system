export async function createList(listInfo) {
  const data = await fetch("http://localhost:8080/todo/createlist", {
    credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(listInfo),
  });

  //const jsonData = data.json();
}

export async function deleteList(listId) {
  const data = await fetch("http://localhost:8080/todo/deletelist", {
    credentials: "include",
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ listId }),
  });

  const jsonData = data.json();
}

export async function archiveList(listStatus) {
  const data = await fetch("http://localhost:8080/todo/archivelist", {
    credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(listStatus),
  });

  const jsonData = data.json();
}

export async function addItem(task) {
  const data = await fetch("http://localhost:8080/todo/additem", {
    credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(task),
  });

  const jsonData = data.json();
}

export async function checkItem(identifiers) {
  const data = await fetch("http://localhost:8080/todo/checkitem", {
    credentials: "include",
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(identifiers),
  });

  const jsonData = data.json();
}

export async function deleteItem(itemId) {
  const data = await fetch("http://localhost:8080/todo/deleteitem", {
    credentials: "include",
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(itemId),
  });

  const jsonData = data.json();
}

export async function getLists() {
  const data = await fetch("http://localhost:8080/todo/getlists", {
    credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  });

  const jsonData = await data.json();
  return jsonData;
}
