"use client";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, FC, ReactElement } from "react";

interface User {
  id: number;
  email: string;
}

interface Props {
  setUserObject: any;
  placeHolderText: string;
}
const UserSearchBar: FC<Props> = (props) => {
  const { setUserObject, placeHolderText } = props;
  const [searchInput, setSearchInput] = useState("");
  const [usersArray, setUsersArray] = useState<any[]>([]);
  const [filteredDataArray, setFilteredDataArray] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (
      filteredDataArray.length === 1 &&
      filteredDataArray[0].email === searchInput
    ) {
      setFilteredDataArray([]);
    }
  }, [filteredDataArray.length, searchInput]);

  const onSearchInputChange = (e: any) => {
    setSearchInput(e.target.value);
    setErrorMessage("");
    setFilteredDataArray([
      ...usersArray.filter((item) => {
        if (e.target.value.length > 0)
          return item.email.toLowerCase().includes(e.target.value);
      }),
    ]);
  };

  const fetchAllUsers = async () => {
    const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser")!);
    const res = await fetch(`http://206.189.91.54/api/v1/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": loggedUser.accessToken,
        expiry: loggedUser.expiry,
        client: loggedUser.client,
        uid: loggedUser.uid,
      },
    });
    const data = await res.json();
    setUsersArray([...data.data]);
  };

  const setError = () => {
    if (
      !usersArray.find((item) => item.email === searchInput) &&
      searchInput !== ""
    )
      setErrorMessage("User not found");
    else setErrorMessage("");
  };
  const onConfirmClick = () => {
    if (errorMessage === "") {
      const userObject = usersArray.find((item) => item.email === searchInput);
      if (userObject) setUserObject(userObject);
    }
  };

  return (
    <div className="flex justify-between items-center px-5 border-b border-slate-100 pb-4">
      {/* <form className="flex justify-center items-center font-black"> */}
      <FontAwesomeIcon icon={faSearch} className="pr-2" />
      <input
        placeholder={placeHolderText}
        list="filteredList"
        value={searchInput}
        className="w-full font-light focus:outline-none text-black mr-2"
        onChange={onSearchInputChange}
        onBlur={setError}
      />
      <span className="text-red-500">{errorMessage}</span>
      <datalist
        id="filteredList"
        className="bg-white text-black absolute border border-blue"
      >
        {filteredDataArray.map((item) => (
          <option key={item.id}>{item.email}</option>
        ))}
      </datalist>

      <button className="disabled:cursor-not-allowed" onClick={onConfirmClick}>
        <FontAwesomeIcon
          icon={faPlus}
          className="bg-blue-500 p-1 text-white h-6 rounded-full"
        />
      </button>
      {/* </form> */}
    </div>
  );
};
export default UserSearchBar;
