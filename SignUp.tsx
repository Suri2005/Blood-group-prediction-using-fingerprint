import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Link,
  Alert,
  CircularProgress,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Divider,
  Collapse,
  SelectChangeEvent,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HeightIcon from '@mui/icons-material/Height';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import FavoriteIcon from '@mui/icons-material/Favorite';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  borderRadius: '16px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
}));

const Form = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  bloodType: string;
  location: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    bloodType: '',
    location: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name as keyof FormData]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      // TODO: Implement actual signup logic
      console.log('Signup attempt with:', formData);
      
      // Store user data in localStorage
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', `${formData.username}`);
      localStorage.setItem('isLoggedIn', 'true');
      
      // Store additional personal information
      localStorage.setItem('userPhone', formData.phone);
      localStorage.setItem('userAddress', formData.location);
      localStorage.setItem('userDOB', formData.dateOfBirth);
      localStorage.setItem('userGender', formData.gender);
      localStorage.setItem('userHeight', formData.height);
      localStorage.setItem('userWeight', formData.weight);
      localStorage.setItem('userEmergencyContact', JSON.stringify(formData.emergencyContact));
      
      // Redirect to home page
      navigate('/');
    } catch (err) {
      setError('Error creating account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <StyledPaper elevation={3}>
            <BloodtypeIcon sx={{ fontSize: 48, mb: 2 }} />
            <Typography component="h1" variant="h5" gutterBottom>
              Create Account
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Join us to start analyzing blood groups
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="given-name"
                    value={formData.username}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
                <Button
                  variant="text"
                  onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
                  sx={{ color: 'white', textDecoration: 'underline' }}
                >
                  {showAdditionalInfo ? 'Hide Additional Information' : 'Add Personal Information (Optional)'}
                </Button>
              </Box>

              <Collapse in={showAdditionalInfo}>
                <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Personal Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="phone"
                      label="Phone Number"
                      name="phone"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="location"
                      label="Location"
                      name="location"
                      autoComplete="street-address"
                      value={formData.location}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="dateOfBirth"
                      label="Date of Birth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        startAdornment: <CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="gender-label">Gender</InputLabel>
                      <Select
                        labelId="gender-label"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        label="Gender"
                        onChange={handleSelectChange}
                      >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="height"
                      label="Height (cm)"
                      name="height"
                      type="number"
                      value={formData.height}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: <HeightIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="weight"
                      label="Weight (kg)"
                      name="weight"
                      type="number"
                      value={formData.weight}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: <MonitorWeightIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                      }}
                    />
                  </Grid>
                </Grid>

                <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>
                  Emergency Contact
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="emergencyContactName"
                      label="Emergency Contact Name"
                      name="name"
                      value={formData.emergencyContact.name}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="emergencyContactPhone"
                      label="Emergency Contact Phone"
                      name="phone"
                      value={formData.emergencyContact.phone}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="emergencyContactRelationship"
                      label="Relationship"
                      name="relationship"
                      value={formData.emergencyContact.relationship}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: <FavoriteIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                      }}
                    />
                  </Grid>
                </Grid>
              </Collapse>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: '25px',
                  background: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign Up'}
              </Button>
            </Form>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/login')}
                sx={{ color: 'white', textDecoration: 'underline' }}
              >
                Already have an account? Sign In
              </Link>
            </Box>
          </StyledPaper>
        </Box>
      </motion.div>
    </Container>
  );
};

export default SignUp; 