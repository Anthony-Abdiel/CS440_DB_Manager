import React, { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

// Define strict types for the User role
type UserRole = "admin" | "employee";

// Define the shape of the User object
interface UserData {
  name: string;
  role: UserRole;
  id: number | null;
}

function Login() {
  // State variables with Types
  const [name, setName] = useState<string>("");
  const [employeeId, setEmployeeId] = useState<string>("");
  const [role, setRole] = useState<UserRole>("employee");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation
    if (!name.trim()) {
      setError("Name is required.");
      setIsLoading(false);
      return;
    }
    if (role === "employee" && !employeeId.trim()) {
      setError("Employee ID is required for employee login.");
      setIsLoading(false);
      return;
    }

    // Construct the payload
    const payload: UserData = {
      name: name.trim(),
      role: role,
      id: role === "employee" ? Number(employeeId) : null,
    };

    try {
      // Execute the POST request to /login
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check credentials.");
      }

      // If the API call is successful, update the Context
      // (Assuming the API returns the user object or we use the payload)
      // const data = await response.json(); 
      
      login(payload); 

      // Navigation logic based on role
      if (role === "admin") {
        navigate("/employees");
      } else {
        navigate("/profile");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // Type assertion to ensure the value is treated as UserRole
    setRole(e.target.value as UserRole);
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name
            <br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </label>
        </div>

        <div>
          <label>
            Role
            <br />
            <select 
              value={role} 
              onChange={handleRoleChange}
              disabled={isLoading}
            >
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </label>
        </div>

        {role === "employee" && (
          <div>
            <label>
              Employee ID
              <br />
              <input
                type="number"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                disabled={isLoading}
              />
            </label>
          </div>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}

export default Login;