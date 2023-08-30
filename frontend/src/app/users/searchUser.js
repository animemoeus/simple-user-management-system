import { useToast } from "@chakra-ui/react";

export default function SearchUser(props) {
  const toast = useToast();
  return (
    <div className="flex justify-between">
      <form className="w-full mr-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className=" shadow block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
            placeholder="Search first name, last name , address..."
            onChange={(event) => props.onSearchChange(event.target.value)}
          />
        </div>
      </form>

      <div className="flex items-center">
        <button
          className=" shadow flex items-center justify-center px-4 h-10 mr-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
          onClick={() => {
            if (props.canPrevPage) {
              props.onPaginationChange(props.currentPage - 1);
            } else {
              toast({
                description: "This is the end of the pagination",
                status: "warning",
                isClosable: true,
                position: "bottom-right",
              });
            }
          }}
        >
          <svg
            className="w-3.5 h-3.5 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
        </button>
        <button
          className="shadow flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
          onClick={() => {
            if (props.canNextPage) {
              props.onPaginationChange(props.currentPage + 1);
            } else {
              toast({
                description: "This is the end of the pagination",
                status: "warning",
                isClosable: true,
                position: "bottom-right",
              });
            }
          }}
        >
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
