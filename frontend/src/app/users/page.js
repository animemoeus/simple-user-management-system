"use client";
import { useEffect, useState } from "react";

import { useDebounce } from "use-debounce";
import AddUserModal from "./addUserModal";
import SearchUser from "./searchUser";

import { getUsers } from "../../api";

export default function User() {
  const [users, setUsers] = useState(null);

  const [_search, setSearch] = useState("");
  const [search] = useDebounce(_search, 1000);

  const getUsersData = async (search) => {
    const result = await getUsers(search);
    setUsers(result);
  };

  const onSearchChange = (text) => {
    setSearch(text);
  };

  useEffect(() => {
    getUsersData(search);
  }, []);

  useEffect(() => {
    getUsersData(search);
  }, [search]);

  return (
    <div className="p-5">
      <div className="flex  mt-2 mb-6">
        <h1 className="flex-auto block text-center text-2xl font-medium">
          Simple User Management
        </h1>
        <span className="self-center">
          <AddUserModal />
        </span>
      </div>

      <div className="my-3">
        <SearchUser onSearchChange={(text) => onSearchChange(text)} />
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                First Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Last Updated
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.results.map((user, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.first_name}
                  </th>
                  <td className="px-6 py-4">{user.last_name}</td>
                  <td className="px-6 py-4">{user.address}</td>
                  <td className="px-6 py-4">{user.updated_at}</td>
                  <td className="px-6 py-4 ">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
