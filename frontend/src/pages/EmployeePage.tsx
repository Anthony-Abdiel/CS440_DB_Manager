import React, { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

interface Employee {
  id: number;
  name: string;
  email: string;
}

function EmployeePage() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch employees on mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("http://localhost:3000/employees");

      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }

      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:3000/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      const newEmployee = await response.json();
      setEmployees([...employees, newEmployee]);
      setName("");
      setEmail("");
      setSuccessMessage("Employee added successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      setError("");
      setSuccessMessage("");
      const response = await fetch(`http://localhost:3000/employees/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      setEmployees(employees.filter(emp => emp.id !== id));
      setSuccessMessage("Employee deleted successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleLogout = () => {
    // Logout logic would go here
    navigate("/");
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#242424"
    }}>
      <header style={{
        backgroundColor: "#1a1a1a",
        borderBottom: "1px solid #ddd",
        padding: "1.5rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1 style={{
          fontSize: "1.875rem",
          fontWeight: "bold",
          color: "rgba(255, 255, 255, 0.87)"
        }}>
          Employee Management
        </h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "0.6em 1.2em",
            backgroundColor: "#1a1a1a",
            color: "white",
            border: "1px solid transparent",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1em",
            fontWeight: "500",
            transition: "border-color 0.25s"
          }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = "#646cff"}
          onMouseOut={(e) => e.currentTarget.style.borderColor = "transparent"}
        >
          Logout
        </button>
      </header>

      <main style={{
        maxWidth: "80rem",
        margin: "0 auto",
        padding: "1.5rem 2rem"
      }}>
        {/* Add Employee Form */}
        <div style={{
          backgroundColor: "#1a1a1a",
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "1.5rem",
          marginBottom: "1.5rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
        }}>
          <h2 style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            marginBottom: "1rem",
            color: "rgba(255, 255, 255, 0.87)"
          }}>
            Add New Employee
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="name" style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "rgba(255, 255, 255, 0.87)",
                marginBottom: "0.25rem"
              }}>
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  backgroundColor: "#2a2a2a",
                  color: "rgba(255, 255, 255, 0.87)",
                  boxSizing: "border-box"
                }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="email" style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "rgba(255, 255, 255, 0.87)",
                marginBottom: "0.25rem"
              }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  backgroundColor: "#2a2a2a",
                  color: "rgba(255, 255, 255, 0.87)",
                  boxSizing: "border-box"
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.6em 1.2em",
                backgroundColor: "#1a1a1a",
                color: "white",
                border: "1px solid transparent",
                borderRadius: "8px",
                fontSize: "1em",
                fontWeight: "500",
                cursor: "pointer",
                transition: "border-color 0.25s"
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = "#646cff"}
              onMouseOut={(e) => e.currentTarget.style.borderColor = "transparent"}
            >
              Add Employee
            </button>
          </form>
        </div>

        {/* Messages */}
        {error && (
          <div style={{
            backgroundColor: "#3a1a1a",
            border: "1px solid #ff6b6b",
            color: "#ff6b6b",
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            marginBottom: "1rem"
          }}>
            {error}
          </div>
        )}
        {successMessage && (
          <div style={{
            backgroundColor: "#1a3a1a",
            border: "1px solid #6bff6b",
            color: "#6bff6b",
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            marginBottom: "1rem"
          }}>
            {successMessage}
          </div>
        )}

        {/* Employee List */}
        <div style={{
          backgroundColor: "#1a1a1a",
          border: "1px solid #ddd",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
        }}>
          <h2 style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            padding: "1.5rem",
            borderBottom: "1px solid #ddd",
            color: "rgba(255, 255, 255, 0.87)",
            margin: 0
          }}>
            Employee List
          </h2>
          {loading ? (
            <div style={{
              padding: "1.5rem",
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.6)"
            }}>
              Loading...
            </div>
          ) : employees.length === 0 ? (
            <div style={{
              padding: "1.5rem",
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.6)"
            }}>
              No employees found
            </div>
          ) : (
            <table style={{
              width: "100%",
              borderCollapse: "collapse"
            }}>
              <thead style={{
                backgroundColor: "#2a2a2a"
              }}>
                <tr>
                  <th style={{
                    padding: "0.75rem 1.5rem",
                    textAlign: "left",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                    color: "rgba(255, 255, 255, 0.6)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                  }}>
                    ID
                  </th>
                  <th style={{
                    padding: "0.75rem 1.5rem",
                    textAlign: "left",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                    color: "rgba(255, 255, 255, 0.6)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                  }}>
                    Name
                  </th>
                  <th style={{
                    padding: "0.75rem 1.5rem",
                    textAlign: "left",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                    color: "rgba(255, 255, 255, 0.6)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                  }}>
                    Email
                  </th>
                  <th style={{
                    padding: "0.75rem 1.5rem",
                    textAlign: "left",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                    color: "rgba(255, 255, 255, 0.6)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody style={{
                backgroundColor: "#1a1a1a"
              }}>
                {employees.map((employee) => (
                  <tr key={employee.id} style={{
                    borderTop: "1px solid #3a3a3a"
                  }}>
                    <td style={{
                      padding: "1rem 1.5rem",
                      fontSize: "0.875rem",
                      color: "rgba(255, 255, 255, 0.87)"
                    }}>
                      {employee.id}
                    </td>
                    <td style={{
                      padding: "1rem 1.5rem",
                      fontSize: "0.875rem",
                      color: "rgba(255, 255, 255, 0.87)"
                    }}>
                      {employee.name}
                    </td>
                    <td style={{
                      padding: "1rem 1.5rem",
                      fontSize: "0.875rem",
                      color: "rgba(255, 255, 255, 0.87)"
                    }}>
                      {employee.email}
                    </td>
                    <td style={{
                      padding: "1rem 1.5rem",
                      fontSize: "0.875rem"
                    }}>
                      <button
                        onClick={() => handleDelete(employee.id)}
                        style={{
                          color: "#ff6b6b",
                          fontWeight: "500",
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "0.875rem"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.color = "#ff4444"}
                        onMouseOut={(e) => e.currentTarget.style.color = "#ff6b6b"}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default EmployeePage;