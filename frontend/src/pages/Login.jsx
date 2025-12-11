import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { CheckSquare } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-darkest">
      <div className="card w-full max-w-md animate-fade-in border-border border">
        <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                <CheckSquare size={28} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-secondary">Sign in to continue to Tasker</p>
        </div>
        
        {error && (
            <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm text-center mb-6">
                {error}
            </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="name@company.com"
          />
          <div className="flex flex-col gap-2">
            <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
            />
            <div className="text-right">
                <Link to="#" className="text-xs text-primary hover:text-primary-hover font-medium">Forgot password?</Link>
            </div>
          </div>
          
          <Button type="submit" className="w-full mt-2 py-3" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center mt-8 text-sm text-secondary">
          Don't have an account? <Link to="/register" className="text-primary hover:text-primary-hover font-semibold transition-colors">Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
