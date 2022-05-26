import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import MakeAdminRow from "./MakeAdminRow";

const MakeAdmin = () => {
  const {
    isLoading,
    refetch,
    data: users,
  } = useQuery("makeadmin", () =>
    fetch("http://localhost:5000/allusers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: `bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="text-3xl text-secondary">Make an admin</div>
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>

              <th>Email</th>
              <th>Make admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <MakeAdminRow refetch user={user} index={index} key={user._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MakeAdmin;
