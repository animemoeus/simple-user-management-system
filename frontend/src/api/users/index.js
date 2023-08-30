async function getUsers(search, page) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `http://localhost:8000/users/?search=${search}&page=${page}`,
    requestOptions
  );

  if (!response.ok) {
    return null;
  }

  return await response.json();
}

async function addUser(userData) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify(userData);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch("http://localhost:8000/users/", requestOptions);
  return await response.json();
}

async function deleteUser(userID) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    `http://localhost:8000/users/${userID}/`,
    requestOptions
  );
  return response.status;
}

export { addUser, deleteUser, getUsers };
