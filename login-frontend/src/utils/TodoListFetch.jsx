export async function createList(identifiers) {
  const data = await fetch("http://localhost:8080/todo/createlist", {
    credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(identifiers),
  });

  const jsonData = data.json();
}

export async function editListName(identifiers) {
  const data = await fetch("http://localhost:8080/todo/editlistname", {
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

export async function deleteList(identifiers) {
  const data = await fetch("http://localhost:8080/todo/deletelist", {
    credentials: "include",
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(identifiers),
  });

  const jsonData = data.json();
}

export async function addItem(identifiers) {
  const data = await fetch("http://localhost:8080/todo/additem", {
    credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(identifiers),
  });

  const jsonData = data.json();
}

export async function editItemName(identifiers) {
  const data = await fetch("http://localhost:8080/todo/edititemname", {
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

export async function deleteItem(identifiers) {
  const data = await fetch("http://localhost:8080/todo/deleteitem", {
    credentials: "include",
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(identifiers),
  });

  const jsonData = data.json();
}

export async function getArchive() {
  const data = await fetch("http://localhost:8080/todo/getarchive", {
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
