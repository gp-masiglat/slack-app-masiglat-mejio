"use client";
import { useEffect, useState, FC, ReactElement } from "react";

interface Props {
  setConversationPartner: any;
}
const UserSearchBar: FC<Props> = (props) => {
  const { setConversationPartner } = props;
  const [searchInput, setSearchInput] = useState("");
  const [usersArray, setUsersArray] = useState<any[]>([]);
  const [filteredDataArray, setFilteredDataArray] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchAllUsers();
  }, []);

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
    // console.log(usersArray);
    if (searchInput === "") setErrorMessage("Please Enter an Email Address");
    else if (!usersArray.find((item) => item.email === searchInput))
      setErrorMessage("User not found");
    else setErrorMessage("");
  };
  const onConfirmClick = () => {
    if (errorMessage === "") {
      const userObject = usersArray.find((item) => item.email === searchInput);
      if (userObject) setConversationPartner(userObject);
    }
  };

  return (
    <>
      <input
        placeholder="Input user email address . . ."
        list="filteredList"
        value={searchInput}
        className="w-full border-none mb-4"
        onChange={onSearchInputChange}
        onBlur={setError}
      />
      <span>{errorMessage}</span>
      <datalist
        id="filteredList"
        className="bg-white text-black absolute border border-blue"
      >
        {filteredDataArray.map((item) => (
          <option key={item.id}>{item.uid}</option>
        ))}
      </datalist>

      <button className="disabled:cursor-not-allowed" onClick={onConfirmClick}>
        Confirm
      </button>
    </>
  );
};
export default UserSearchBar;
