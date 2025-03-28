import React, { useEffect, useState } from "react";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    // Fetch users from the backend
    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/users");
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to fetch users");
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle edit button click
    const handleEdit = (user) => {
        setEditUser(user);
    };

    // Handle user update
    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${editUser.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editUser),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to update user");

            alert("User updated successfully!");
            fetchUsers();
            setEditUser(null);
        } catch (err) {
            alert(err.message);
        }
    };

    // Handle delete user
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const response = await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to delete user");

            alert("User deleted successfully!");
            fetchUsers();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Admin User Management</h2>
            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : users.length === 0 ? (
                <p className="text-gray-600">No users found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 border-b">Name</th>
                                <th className="px-6 py-3 border-b">Email</th>
                                <th className="px-6 py-3 border-b">Role</th>
                                <th className="px-6 py-3 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 border-b">{user.name}</td>
                                    <td className="px-6 py-4 border-b">{user.email}</td>
                                    <td className="px-6 py-4 border-b">{user.role}</td>
                                    <td className="px-6 py-4 border-b">
                                        <button 
                                            onClick={() => handleEdit(user)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(user.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Edit User Form */}
            {editUser && (
                <div className="mt-8 p-6 border rounded-lg shadow-lg bg-white">
                    <h3 className="text-xl font-semibold mb-4">Edit User</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                            <input
                                type="text"
                                value={editUser.name}
                                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                            <input
                                type="email"
                                value={editUser.email}
                                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role:</label>
                            <select
                                value={editUser.role}
                                onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="admin">Admin</option>
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </select>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button 
                                onClick={handleUpdate}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Update
                            </button>
                            <button 
                                onClick={() => setEditUser(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;