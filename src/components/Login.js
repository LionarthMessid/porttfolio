import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import GoogleButton from 'react-google-button';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Grid,
  useTheme
} from '@mui/material';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await loginWithEmail(email, password);
      navigate('/home');
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        navigate('/registration');
      } else {
        setError('Failed to sign in: ' + error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      const result = await loginWithGoogle();
      const user = result.user;
      
      const metadata = user.metadata;
      const isNewUser = metadata.creationTime === metadata.lastSignInTime;
      
      if (isNewUser) {
        navigate('/registration');
      } else {
        navigate('/home');
      }
    } catch (error) {
      setError('Failed to sign in with Google: ' + error.message);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: 'background.default' }}>
      <Grid container>
        {/* Left side - Branding */}
        <Grid item xs={12} md={6} sx={{
          bgcolor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <img src="/logo192.png" alt="Porttfolio Logo" style={{ width: '48px', height: '48px', marginRight: '16px' }} />
            <Typography variant="h2" component="h1" sx={{ color: '#1a9c51', fontWeight: 700 }}>
              Porttfolio
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ color: '#333', textAlign: 'center', maxWidth: '80%', mb: 3 }}>
            Your Gateway to Algorithmic Trading
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', textAlign: 'center', maxWidth: '80%' }}>
            Experience the power of automated trading with our professional-grade platform. Access advanced algorithms, real-time market data, and sophisticated analytics tools.
          </Typography>
        </Grid>

        {/* Right side - Login Form */}
        <Grid item xs={12} md={6} sx={{
          bgcolor: '#0a1929',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 4
        }}>
          <Box sx={{ maxWidth: 400, width: '100%', mx: 'auto' }}>
            <Typography variant="h4" sx={{ color: '#fff', mb: 4, textAlign: 'center' }}>
              Welcome Back
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
            <form onSubmit={handleEmailLogin}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                  },
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                  '& .MuiOutlinedInput-input': { color: '#fff' }
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                  },
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                  '& .MuiOutlinedInput-input': { color: '#fff' }
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: '#1a9c51',
                  '&:hover': { bgcolor: '#147c41' },
                  height: '48px',
                  fontSize: '1.1rem'
                }}
              >
                Sign In
              </Button>
            </form>
            <Box sx={{
              mt: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}>
              <Typography sx={{ color: '#fff', textAlign: 'center' }}>
                Or continue with
              </Typography>
              <GoogleButton
                onClick={handleGoogleLogin}
                style={{ width: '100%', borderRadius: '4px' }}
              />
              <Typography sx={{ color: '#fff', mt: 2 }}>
                Not a user?{' '}
                <Button
                  sx={{
                    color: '#1a9c51',
                    textTransform: 'none',
                    '&:hover': { bgcolor: 'rgba(26, 156, 81, 0.1)' }
                  }}
                  onClick={() => navigate('/registration')}
                >
                  Create a new account
                </Button>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}