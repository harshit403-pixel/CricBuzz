import { useUsers } from "../../features/users/hooks/useUsers";
import { useUpdateRole } from "../../features/users/hooks/useUpdateRole";

function UsersList() {
  const { data, isLoading, isError } = useUsers();

  const updateRoleMutation = useUpdateRole();

  const users = data?.data || [];

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (isError) {
    return <div>Failed to load users</div>;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Users</h1>

      <div className="mb-4 text-slate-400">Total Users: {users.length}</div>

      <div className="overflow-hidden rounded-xl border border-slate-800">
        <table className="w-full">
          <thead className="bg-slate-900">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t border-slate-800">
                <td className="p-4">{user.name}</td>

                <td className="p-4">{user.email}</td>

                <td className="p-4">
                  <span
                    className={`rounded px-2 py-1 text-xs font-medium ${
                      user.role === "SUPER_ADMIN"
                        ? "bg-red-500 text-white"
                        : user.role === "ADMIN"
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-700 text-white"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-4">
                  {user.role === "SCORER" ? (
                    <button
                      onClick={() =>
                        updateRoleMutation.mutate({
                          id: user._id,
                          role: "ADMIN",
                        })
                      }
                      disabled={updateRoleMutation.isPending}
                      className="rounded bg-emerald-500 px-3 py-1 text-white"
                    >
                      Make Admin
                    </button>
                  ) : user.role === "ADMIN" ? (
                    <button
                      onClick={() =>
                        updateRoleMutation.mutate({
                          id: user._id,
                          role: "SCORER",
                        })
                      }
                      disabled={updateRoleMutation.isPending}
                      className="rounded bg-slate-700 px-3 py-1 text-white"
                    >
                      Make User
                    </button>
                  ) : (
                    <span className="text-slate-500">Protected</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersList;
