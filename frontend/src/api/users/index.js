const API_URL = "https://simple-user-management.arter.my.id";

async function getUsers(search, page, orderBy) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${API_URL}/users/?search=${search}&page=${page}&ordering=${orderBy}`,
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

  const response = await fetch(`${API_URL}/users/`, requestOptions);

  return response;
}

async function editUser(userData) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify(userData);

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${API_URL}/users/${userData.id}/`,
    requestOptions
  );
  return response;
}

async function deleteUser(userID) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(`${API_URL}/users/${userID}/`, requestOptions);
  return response.status;
}

export { addUser, deleteUser, editUser, getUsers };
