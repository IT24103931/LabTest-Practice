import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <div className="hero">
        <h1 className="hero-title">
          Build full-stack apps<br />
          <span className="hero-accent">with MERN</span>
        </h1>
        <p className="hero-sub">
          MongoDB · Express · React · Node.js — a complete starter template
          with authentication, protected routes, and full CRUD.
        </p>
        <div className="hero-cta">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary btn-lg">Go to Dashboard →</Link>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary btn-lg">Get Started</Link>
              <Link to="/login" className="btn btn-outline btn-lg">Sign In</Link>
            </>
          )}
        </div>
      </div>

      <div className="features">
        {[
          { icon: '🔐', title: 'JWT Auth', desc: 'Secure register & login with hashed passwords and token-based sessions.' },
          { icon: '🛡️', title: 'Protected Routes', desc: 'Client-side and server-side route guards keep data private.' },
          { icon: '⚡', title: 'Full CRUD', desc: 'Create, read, update and delete items — all connected to MongoDB.' },
          { icon: '📦', title: 'Clean Structure', desc: 'MVC backend + context-driven frontend, ready to scale.' },
        ].map((f) => (
          <div className="feature-card" key={f.title}>
            <span className="feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
