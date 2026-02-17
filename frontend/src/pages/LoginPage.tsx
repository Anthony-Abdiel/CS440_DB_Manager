import React, { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

type LoginResponse = {
  ok: boolean;
};

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      setIsLoading(false);
      return;
    }

    try {
      // If you're running Vite on :5173 and backend on :3000,
      // you'll probably need the full URL OR a Vite proxy.
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      // Option A: your backend returns 401 with empty body
      if (!response.ok) {
        setError("Invalid credentials.");
        return;
      }

      // Option B: if backend returns JSON { ok: true }
      let data: LoginResponse | null = null;
      try {
        data = (await response.json()) as LoginResponse;
      } catch {
        // If your backend sends no JSON, ignore
      }

      if (data && data.ok === false) {
        setError("Invalid credentials.");
        return;
      }

      // Success, go to employees page
      navigate("/employees");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "420px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <h1 style={{ marginTop: 0, textAlign: "center" }}>Login</h1>

      {error && (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block" }}>
            Username
            <input
              style={{ width: "100%", padding: "10px", marginTop: "6px", boxSizing: "border-box" }}
              type="text"
              value={username}
              onChange={handleUsernameChange}
              required
              disabled={isLoading}
              autoComplete="username"
            />
          </label>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block" }}>
            Password
            <input
              style={{ width: "100%", padding: "10px", marginTop: "6px", boxSizing: "border-box" }}
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              disabled={isLoading}
              autoComplete="current-password"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "10px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  </div>
);
}

export default Login;
