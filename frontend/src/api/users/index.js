export default async function getUsers() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch("http://localhost:8000/users/", requestOptions);
  return await response.json();
}
