
"use client";

import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch("/api/me", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load account information.");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError("Unable to load your account.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      window.location.href = "/login";
    } catch (err) {
      setError("Unable to log out. Please try again.");
    }
  };

  if (loading) {
    return (
      <main className="dashboard-page">
        <p className="dashboard-status">Loading your dashboard...</p>
      </main>
    );
  }

  if (error || !user) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-card">
          <p className="dashboard-error">
            {error || "Unable to load your account."}
          </p>
          <a href="/login" className="dashboard-home-link">
            Return to Login
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div className="dashboard-avatar">
            {user.fullname?.charAt(0).toUpperCase() || "U"}
          </div>

          <span className="dashboard-badge">
            ● Account Dashboard
          </span>

          <h1>Welcome Back!</h1>
          <p>
            Hello, <strong>{user.fullname}</strong>!
            We're glad to see you again.
          </p>
        </div>

        <div className="dashboard-info">
          <h2>Account Information</h2>

          <div className="dashboard-info-item">
            <span>Full Name</span>
            <strong>{user.fullname}</strong>
          </div>

          <div className="dashboard-info-item">
            <span>Email Address</span>
            <strong>{user.email}</strong>
          </div>

          <div className="dashboard-info-item">
            <span>Account Status</span>
            <span className="dashboard-active">
              ● Active
            </span>
          </div>
        </div>

        {error && (
          <p className="dashboard-error" role="alert">
            {error}
          </p>
        )}

        <button
          onClick={handleLogout}
          className="dashboard-logout"
        >
          Log Out
        </button>

        <p className="dashboard-footer">
          AuthPortal • DIT205 Web Application
        </p>
      </div>
    </main>
  );
}
