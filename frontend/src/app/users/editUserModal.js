import { useToast } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

import { editUser as editUserAPI } from "../../api";

export default function EditUserModal({ user }) {
  const [showModal, setShowModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: user });

  const toast = useToast();

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    const response = await editUserAPI(data);

    // update the from value
    setValue("first_name", response.first_name);
    setValue("last_name", response.last_name);
    setValue("address", response.address);
    setIsLoading(false);
    toast({
      description: "Updated",
      status: "success",
      isClosable: true,
      position: "top-right",
    });
  };

  React.useEffect(() => {
    if (!showModal) {
      reset();
    }
  }, [showModal]);

  return (
    <>
      <button
        data-modal-target="addUserModal"
        data-modal-toggle="addUserModal"
        type="button"
        className="shadow hover:shadow-md text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-0 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-2"
        onClick={() => setShowModal(!showModal)}
      >
        Edit
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-1">
            <div className="relative w-5/6 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold text-black">
                    Edit User
                  </h3>
                  <button
                    className="ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-gray-500 h-6 w-6 text-xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto text-left">
                  <form
                    className="w-100"
                    onSubmit={handleSubmit((data) => {
                      handleFormSubmit(data);
                      // console.log(data);
                    })}
                  >
                    <div className="mb-6">
                      <label
                        htmlFor="firstName"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-none focus:ring-1 focus:ring-gray-500 block w-full p-2.5 "
                        required
                        // value={user.first_name}
                        {...register("first_name")}
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        // value={user.last_name}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-none focus:ring-1 focus:ring-gray-500 block w-full p-2.5 "
                        {...register("last_name")}
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="address"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        required
                        // value={user.address}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-none focus:ring-1 focus:ring-gray-500 block w-full p-2.5 "
                        {...register("address")}
                      />
                    </div>
                    <div className="flex items-center justify-end pt-4 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        {isLoading ? "Loading..." : "Save Changes"}
                      </button>
                    </div>
                  </form>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
