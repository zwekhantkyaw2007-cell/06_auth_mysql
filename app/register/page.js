"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // send the form data to the API; on success go to the login page
  const handleRegister = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullname, email, password }),
    });
    const data = await response.json();

    if (response.ok) {
      router.push("/login");
    } else {
      setMessage(data.message); // e.g. "Email already registered"
    }
  };


return (
  <main className="auth-page">
    <div className="login-card">
      <div className="login-header">
        <div className="login-icon">✨</div>
        <h1>Create Account</h1>
        <p>Register to get started with AuthPortal</p>
      </div>

      <form onSubmit={handleRegister} className="login-form">
        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input
            id="fullname"
            type="text"
            placeholder="Enter your full name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            autoComplete="name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>

        {message && (
          <p className="login-error" role="alert">
            {message}
          </p>
        )}

        <button type="submit" className="login-button">
          Create Account
        </button>
      </form>

      <p className="register-text">
        Already have an account?{" "}
        <Link href="/login">Sign In</Link>
      </p>

      <div className="login-footer">
        <Link href="/">← Back to Home</Link>
      </div>
    </div>
  </main>
);
