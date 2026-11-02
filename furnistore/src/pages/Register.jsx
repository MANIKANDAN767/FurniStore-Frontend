import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "", // ✅ Added phone state
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Send all 4 fields to the backend
      const response = await registerUser(formData);

      // Save token and user to localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      // Reload page to update the header with the new user
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="wrap fade-in"
      style={{ maxWidth: 500, margin: "40px auto" }}
    >
      <h1 className="display" style={{ textAlign: "center", marginBottom: 30 }}>
        Create Account
      </h1>

      {error && (
        <div
          style={{
            background: "#fce8e6",
            color: "#c5221f",
            padding: 12,
            borderRadius: 4,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          background: "#fff",
          padding: 30,
          borderRadius: 8,
          border: "1px solid var(--line, #ddd)",
        }}
      >
        {/* Full Name */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: 6,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
            style={{
              width: "100%",
              padding: 10,
              border: "1px solid var(--line, #ddd)",
              borderRadius: 4,
            }}
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: 6,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
            style={{
              width: "100%",
              padding: 10,
              border: "1px solid var(--line, #ddd)",
              borderRadius: 4,
            }}
            placeholder="you@example.com"
          />
        </div>

        {/* ✅ Phone Number */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: 6,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="input-field"
            style={{
              width: "100%",
              padding: 10,
              border: "1px solid var(--line, #ddd)",
              borderRadius: 4,
            }}
            placeholder="+91 98765 43210"
          />
        </div>

        {/* Password */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: 6,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input-field"
            style={{
              width: "100%",
              padding: 10,
              border: "1px solid var(--line, #ddd)",
              borderRadius: 4,
            }}
            placeholder="At least 6 characters"
            minLength={6}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ width: "100%", padding: 12, fontSize: 16, marginTop: 10 }}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: 20, fontSize: 14 }}>
        Already have an account?{" "}
        <Link
          to="/login"
          style={{
            color: "var(--primary, #007bff)",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Login here
        </Link>
      </p>
    </div>
  );
}
