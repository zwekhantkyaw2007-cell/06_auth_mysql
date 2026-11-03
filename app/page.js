
import Link from "next/link";

export default function Home() {
  return (
    <main className="home">
      <nav className="navbar">
        <h2>AuthPortal</h2>
        <div className="navlinks">
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      </nav>

      <section className="hero">
        <span className="tag">DIT205 PROJECT</span>
        <h1>Welcome to My Website</h1>
        <p>
          A modern authentication system built
          with Next.js and MySQL.
        </p>

        <div className="profile">
          <h2>Student Information</h2>
          <p><strong>First Name:</strong> Zwe</p>
          <p><strong>Last Name:</strong> Khant Kyaw</p>
          <p><strong>Student ID:</strong> 6805189</p>
        </div>

        <div className="actions">
          <Link href="/register" className="primary">
            Register
          </Link>
          <Link href="/login" className="secondary">
            Login
          </Link>
        </div>
      </section>
    </main>
  );
}
