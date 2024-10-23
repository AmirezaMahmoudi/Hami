import { useEffect, useState } from "react";
import PageTitle from "../../../../Components/PageTitle";
import { deleteUser, getUsersList } from "../../../../Services/Settings/users";
import { Alert, Confirm } from "../../../../utils/alerts";
import { removeObjectById } from "../../../../Functions/removeObjectById";
import { Link } from "react-router-dom";
// import Table from "./Table";
const headers = [
  "No.",
  "Username",
  "Firstname",
  "Lastname",
  "User level",
  "Edit",
  "Delete",
];
const UserList = () => {
  const [users, setUsers] = useState([{ a: "aaa" }]);

  const handleGetUsers = async () => {
    try {
      const { data } = await getUsersList();
      setUsers(data);
    } catch (error) {
      Alert("Error");
    }
  };

  const handleDeleteUser = async (id) => {
    const { value } = await Confirm(
      " Delete user ",
      "Are you sure ?",
      "question"
    );
    if (value) {
      try {
        await deleteUser(id);
        const newData = removeObjectById(users, id, "id");
        setUsers(newData);
        Alert(" User delete ", "User deleted successfully", "success");
      } catch (error) {
        Alert("Error", error?.response?.data);
      }
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <div className="my-10 mx-8">
      <PageTitle title={"Users list"} />

      <div className="max-w-full mx-auto  mt-8">
        <div className="overflow-auto">
          <div className="">
            <div className="inline-block min-w-full  rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    {headers.map((t) => (
                      <th
                        key={Math.random()}
                        className="px-3 py-3 border-e last:border-0 border-[#DFDFDF]
                        text-left text-xs font-semibold uppercase 
                       tracking-wider bg-[#22A553] text-white"
                      >
                        {t}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => {
                    return (
                      <tr className="text-slate-900 *:px-4 *:py-3 *:border-e *:border-[#414F63] ">
                        <td className=" border-b bg-white text-sm">{i + 1}</td>
                        <td className=" border-b bg-white text-sm">{u.user}</td>
                        <td className=" border-b bg-white text-sm">
                          {u.fname}
                        </td>
                        <td className=" border-b bg-white text-sm">
                          {u.lname}
                        </td>
                        <td className=" border-b bg-white text-sm">
                          {u.per == 1 ? "Admin" : "Operator"}
                        </td>
                        <td className="  border-b bg-white text-sm">
                          <Link to={`/settings/users/addUser/${u.id}`}>
                            <img
                              className="block cursor-pointer mx-auto"
                              src="/Assets/svg/Configuration/Edit.svg"
                              alt=""
                            />
                          </Link>
                        </td>
                        <td className=" border-b bg-white text-sm last:border-e-0">
                          {u.per != 1 ? (
                            <img
                              onClick={() => handleDeleteUser(u.id)}
                              className="block cursor-pointer mx-auto"
                              src="/Assets/svg/Configuration/Delete.svg"
                              alt=""
                            />
                          ) : null}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
