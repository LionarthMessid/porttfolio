import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Alert } from '@mui/material';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  Grid
} from '@mui/material';

const steps = ['Personal Information', 'Trading Profile'];

export default function Registration() {
  const navigate = useNavigate();
  const { signupWithEmail } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
    dob: '',
    maritalStatus: '',
    sex: '',
    riskLevel: '',
    experienceLevel: ''
  });

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      try {
        setError('');
        // Create user account with email/password
        const userCredential = await signupWithEmail(formData.email, formData.password);
        
        // Store additional user profile data
        // TODO: Implement profile data storage in your backend
        console.log('User created:', userCredential.user);
        console.log('Profile data:', formData);
        
        // Navigate to home page
        navigate('/home');
      } catch (error) {
        setError('Failed to create account: ' + error.message);
        console.error('Error during registration:', error);
      }
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const renderStepContent = (step) => {
    const formFieldStyles = {
      '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
      },
      '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
      '& .MuiOutlinedInput-input': { color: '#fff' },
      '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.7)' }
    };

    switch (step) {
      case 0:
        return (
          <>
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              margin="normal"
              required
              sx={formFieldStyles}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange('password')}
              margin="normal"
              required
              sx={formFieldStyles}
            />
            <TextField
              fullWidth
              label="Full Name"
              value={formData.name}
              onChange={handleChange('name')}
              margin="normal"
              required
              sx={formFieldStyles}
            />
            <TextField
              fullWidth
              label="Age"
              type="number"
              value={formData.age}
              onChange={handleChange('age')}
              margin="normal"
              required
              sx={formFieldStyles}
            />
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              value={formData.dob}
              onChange={handleChange('dob')}
              margin="normal"
              required
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                ...formFieldStyles,
                '& input': {
                  color: '#fff'
                },
                '& input[type="date"]::-webkit-calendar-picker-indicator': {
                  filter: 'invert(1)'
                }
              }}
            />
            <FormControl fullWidth margin="normal" required sx={formFieldStyles}>
              <InputLabel>Marital Status</InputLabel>
              <Select
                value={formData.maritalStatus}
                onChange={handleChange('maritalStatus')}
                label="Marital Status"
              >
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="married">Married</MenuItem>
                <MenuItem value="divorced">Divorced</MenuItem>
                <MenuItem value="widowed">Widowed</MenuItem>
              </Select>
            </FormControl>
            <FormControl component="fieldset" margin="normal" required>
              <Typography variant="subtitle1" sx={{ color: '#fff', mb: 1 }}>Sex</Typography>
              <RadioGroup
                row
                value={formData.sex}
                onChange={handleChange('sex')}
              >
                <FormControlLabel value="male" control={<Radio sx={{ color: 'rgba(255,255,255,0.7)', '&.Mui-checked': { color: '#1a9c51' } }} />} label="Male" sx={{ color: '#fff' }} />
                <FormControlLabel value="female" control={<Radio sx={{ color: 'rgba(255,255,255,0.7)', '&.Mui-checked': { color: '#1a9c51' } }} />} label="Female" sx={{ color: '#fff' }} />
                <FormControlLabel value="other" control={<Radio sx={{ color: 'rgba(255,255,255,0.7)', '&.Mui-checked': { color: '#1a9c51' } }} />} label="Other" sx={{ color: '#fff' }} />
              </RadioGroup>
            </FormControl>
          </>
        );
      case 1:
        return (
          <>
            <FormControl fullWidth margin="normal" required sx={formFieldStyles}>
              <InputLabel>Risk Level</InputLabel>
              <Select
                value={formData.riskLevel}
                onChange={handleChange('riskLevel')}
                label="Risk Level"
              >
                <MenuItem value="low">Low - Conservative</MenuItem>
                <MenuItem value="medium">Medium - Moderate</MenuItem>
                <MenuItem value="high">High - Aggressive</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required sx={formFieldStyles}>
              <InputLabel>Trading Experience</InputLabel>
              <Select
                value={formData.experienceLevel}
                onChange={handleChange('experienceLevel')}
                label="Trading Experience"
              >
                <MenuItem value="beginner">Beginner (0-1 years)</MenuItem>
                <MenuItem value="intermediate">Intermediate (1-3 years)</MenuItem>
                <MenuItem value="advanced">Advanced (3-5 years)</MenuItem>
                <MenuItem value="expert">Expert (5+ years)</MenuItem>
              </Select>
            </FormControl>
          </>
        );
      default:
        return null;
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
            Advanced Algorithmic Trading Platform
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', textAlign: 'center', maxWidth: '80%', mb: 3 }}>
            Transform your trading strategy with our powerful algorithmic trading platform. Leverage advanced automation, real-time analytics, and professional-grade tools to optimize your trading performance.
          </Typography>
        </Grid>

        {/* Right side - Registration Form */}
        <Grid item xs={12} md={6} sx={{
          bgcolor: '#0a1929',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 4
        }}>
          <Box sx={{ maxWidth: 500, width: '100%', mx: 'auto' }}>
            <Typography variant="h4" sx={{ color: '#fff', mb: 4, textAlign: 'center' }}>
              Complete Your Profile
            </Typography>
            <Stepper activeStep={activeStep} sx={{
              mb: 4,
              '& .MuiStepLabel-label': { color: 'rgba(255,255,255,0.7)' },
              '& .MuiStepLabel-label.Mui-active': { color: '#1a9c51' },
              '& .MuiStepIcon-root': { color: 'rgba(255,255,255,0.3)' },
              '& .MuiStepIcon-root.Mui-active': { color: '#1a9c51' },
              '& .MuiStepIcon-root.Mui-completed': { color: '#1a9c51' }
            }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {renderStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,0.3)',
                  '&:hover': { borderColor: 'rgba(255,255,255,0.5)' },
                  '&.Mui-disabled': { color: 'rgba(255,255,255,0.3)' }
                }}
                variant="outlined"
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  bgcolor: '#1a9c51',
                  '&:hover': { bgcolor: '#147c41' },
                  minWidth: '100px'
                }}
              >
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Box>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                onClick={() => navigate('/')}
                sx={{
                  color: '#1a9c51',
                  textTransform: 'none',
                  '&:hover': { bgcolor: 'rgba(26, 156, 81, 0.1)' }
                }}
              >
                Back to Login
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}