"use client";
import { useEffect, useState } from "react";

import { useDebounce } from "use-debounce";
import AddUserModal from "./addUserModal";
import EditUserModal from "./editUserModal";
import SearchUser from "./searchUser";

import { deleteUser, getUsers } from "../../api";

export default function User() {
  const [users, setUsers] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [canPrevPage, setCanPrevPage] = useState(false);
  const [canNextPage, setCanNextPage] = useState(false);
  const [_search, setSearch] = useState("");
  const [search] = useDebounce(_search, 1000);

  const getUsersData = async (search, currentPage) => {
    const result = await getUsers(search, currentPage);
    setCanPrevPage(Boolean(result?.previous));
    setCanNextPage(Boolean(result?.next));
    setUsers(result);
  };

  const onSearchChange = (text) => {
    setSearch(text);
    setCurrentPage(1);
  };

  useEffect(() => {
    getUsersData(search, currentPage);
  }, []);

  useEffect(() => {
    getUsersData(search, currentPage);
  }, [search, currentPage]);

  return (
    <div className="p-5">
      <div className="flex  mt-2 mb-6">
        <h1 className="flex-auto block text-center text-2xl font-medium">
          Simple User Management
        </h1>
        <span className="self-center">
          <AddUserModal updateTable={() => getUsersData(search, currentPage)} />
        </span>
      </div>

      <div className="my-3">
        <SearchUser
          onSearchChange={(text) => onSearchChange(text)}
          onPaginationChange={(page) => setCurrentPage(page)}
          currentPage={currentPage}
          canPrevPage={canPrevPage}
          canNextPage={canNextPage}
        />
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
            {users?.results?.map((user, index) => {
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
                    <EditUserModal
                      user={user}
                      updateTable={() => getUsersData(search, currentPage)}
                    />
                    <button
                      className="mx-1 shadow hover:shadow-md text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-0 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-2"
                      onClick={async () => {
                        const del = confirm(
                          "Are you sure you want to delete this?"
                        );

                        if (del) {
                          await deleteUser(user.id);
                          if ((await getUsers(search, currentPage)) === null) {
                            setCurrentPage(currentPage - 1);
                          }
                          getUsersData(search, currentPage);
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                      </svg>
                    </button>
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
