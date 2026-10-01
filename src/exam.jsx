import React, { useState } from "react";
import "./exam.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const [users, setUsers] = useState([]);
  
  // Input handle
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Save user
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.contact ||
      !formData.password
    ) {
      alert("Please fill all fields!");
      return;
    }

    const oldUsers = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      password: formData.password,
    };

    const updatedUsers = [...oldUsers, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("User saved successfully!");

    setFormData({
      name: "",
      email: "",
      contact: "",
      password: "",
    });
  };

  // View users
  const handleViewUsers = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  };

  // Delete user
  const deleteUser = (id) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = storedUsers.filter((user) => user.id !== id);

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  return (
    <div className="app">
      <div className="container">

        {/* Header */}
        <div className="header">
          <h1>User Registration</h1>
          <p>Create your account and manage your information</p>
        </div>

        {/* Form Card */}
        <div className="card">
          <h2>Register User</h2>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Contact Number</label>
              <input
                type="tel"
                name="contact"
                placeholder="Enter contact number"
                value={formData.contact}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button className="save-btn" type="submit">
              Save User
            </button>

          </form>

          <button className="view-btn" onClick={handleViewUsers}>
            View Users
          </button>
        </div>

        {/* Users Section */}
        {users.length > 0 && (
          <div className="users-section">

            <div className="users-header">
              <h2>Saved Users</h2>
              <span>{users.length} Users</span>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Password</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.contact}</td>
                      <td>••••••••</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;