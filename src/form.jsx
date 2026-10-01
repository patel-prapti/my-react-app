import { useState } from "react";
import "./form.css";

function Form() {
  const emptyForm = { name: "", email: "", password: "", contact: "" };

  const [formData, setFormData] = useState(emptyForm);
  const [savedData, setSavedData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password" && value.length > 8) return;
    if (name === "contact" && value.length > 10) return;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("userData", JSON.stringify(formData));
    console.log("Data Saved:", formData);
    alert("Data saved successfully!");
    setFormData(emptyForm);
  };

  const handleView = () => {
    const data = localStorage.getItem("userData");

    if (!data) {
      alert("No data found!");
      return;
    }

    const user = JSON.parse(data);
    setSavedData(user);
    console.log("Data from Local Storage:", user);
  };

  return (
    <div className="page">
      <div className="form-container">

        <div className="top-icon">U</div>
        <h1>Create Your Account</h1>
        <p className="subtitle">Enter your details below</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Email ID</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                maxLength="8"
                placeholder="Maximum 8 characters"
                value={formData.password}
                onChange={handleChange}
                required />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}>

                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="field">
            <label>Contact Number</label>
            <input
              type="tel"
              name="contact"
              maxLength="10"
              inputMode="numeric"
              placeholder="Enter 10 digit number"
              value={formData.contact}
              onChange={handleChange}
              required />

          </div>

          <button className="save-btn" type="submit">
            Save Data
          </button>
        </form>

        <button className="view-btn" onClick={handleView}>
          View Saved Data
        </button>

        {savedData && (
          <div className="saved-box">
            <div className="saved-title">
              <div>
                <small>SAVED INFORMATION</small>
                <h2>Your Data</h2>
              </div>
              <span>✓ Saved</span>
            </div>

            <div className="info">
              <label>Name</label>
              <p>{savedData.name}</p>
            </div>

            <div className="info">
              <label>Email ID</label>
              <p>{savedData.email}</p>
            </div>

            <div className="info">
              <label>Password</label>
              <p>{savedData.password}</p>
            </div>

            <div className="info">
              <label>Contact Number</label>
              <p>{savedData.contact}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Form;
