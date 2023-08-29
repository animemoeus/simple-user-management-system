export default async function getUsers(search) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `http://localhost:8000/users/?search=${search}`,
    requestOptions
  );
  return await response.json();
}
