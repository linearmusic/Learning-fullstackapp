import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { loginUser, registerUser, checkProtectedRoute } from './services/api'
import './App.css'

function App() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [protectedData, setProtectedData] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords don't match");
        }
        const { confirmPassword, ...registrationData } = formData;
        await registerUser(registrationData);
        setIsSignUp(false);
      } else {
        const data = await loginUser(formData);
        if (data.token) {
          localStorage.setItem('token', data.token);
          setIsAuthenticated(true);
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const testProtected = async () => {
    try {
      const result = await checkProtectedRoute();
      setProtectedData(result.message);
    } catch (error) {
      setProtectedData('Access denied');
    }
  };

  return (
    <Router>
      <div className="container">
        {isAuthenticated ? (
          <div>
            <h2>Welcome!</h2>
            <button onClick={testProtected}>Test Protected Route</button>
            {protectedData && <p>{protectedData}</p>}
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="userId"
                placeholder="User ID"
                value={formData.userId}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {isSignUp && (
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              )}
              <button type="submit">
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>
            <p onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </p>
          </div>
        )}
      </div>
    </Router>
  )
}

export default App
