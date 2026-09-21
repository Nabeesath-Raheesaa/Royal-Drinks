import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Crown, Mail, Lock, Eye, EyeOff, Shield, UserCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.js';
import './Auth.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const redirectPath = new URLSearchParams(location.search).get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);

    const res = await login(email, password);
    setSubmitting(false);

    if (res.success) {
      if (res.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(redirectPath);
      }
    } else {
      setErrorMessage(res.message);
    }
  };

  const fillAdminCredentials = () => {
    setEmail('admin@royaldrinks.com');
    setPassword('admin123');
  };

  const fillCustomerCredentials = () => {
    setEmail('customer@royaldrinks.com');
    setPassword('user123');
  };

  return (
    <div className="auth-page section-padding">
      <div className="container flex-center">
        <div className="auth-card card-glass">
          <div className="auth-header text-center">
            <Crown size={36} className="auth-logo-crown" />
            <h2>Royal Sign In</h2>
            <p>Welcome back to Royal Drinks Concierge</p>
          </div>

          {/* Quick Demo Credential Fillers */}
          <div className="demo-credentials-box">
            <span className="demo-label">⚡ Quick Demo Test Logins:</span>
            <div className="demo-btn-group">
              <button type="button" className="demo-fill-btn admin-demo" onClick={fillAdminCredentials}>
                <Shield size={14} /> Admin Credentials
              </button>
              <button type="button" className="demo-fill-btn customer-demo" onClick={fillCustomerCredentials}>
                <UserCheck size={14} /> Customer Credentials
              </button>
            </div>
          </div>

          {errorMessage && <div className="auth-error-alert">{errorMessage}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-pw-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-gold btn-lg w-100" disabled={submitting}>
              {submitting ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer text-center">
            <p>
              Don't have a Royal account yet?{' '}
              <Link to="/register" className="text-gold font-bold">
                Register Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
