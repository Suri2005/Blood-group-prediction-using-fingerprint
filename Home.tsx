import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  Grid, 
  Typography, 
  useTheme, 
  Card, 
  CardContent, 
  CardActionArea,
  Paper,
  Stack,
  Avatar
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  Bloodtype as BloodtypeIcon,
  Timeline as TimelineIcon,
  People as PeopleIcon,
  Psychology as PsychologyIcon,
  Science as ScienceIcon,
  Security as SecurityIcon,
  Feedback as FeedbackIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

const MotionBox = motion(Box);

const Home: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      title: 'AI Blood Predictor',
      description: 'Advanced machine learning algorithms for accurate blood group prediction',
      icon: <BloodtypeIcon fontSize="large" />,
      path: '/ai-predictor',
      color: '#f44336',
    },
    {
      title: 'Health Score',
      description: 'Get comprehensive health insights based on your blood group',
      icon: <TimelineIcon fontSize="large" />,
      path: '/health-score',
      color: '#4caf50',
    },
    {
      title: 'Blood Donors',
      description: 'Connect with potential blood donors in your area',
      icon: <PeopleIcon fontSize="large" />,
      path: '/blood-donors',
      color: '#2196f3',
    },
    {
      title: 'AI Dashboard',
      description: 'Access detailed analytics and predictions',
      icon: <PsychologyIcon fontSize="large" />,
      path: '/ai-dashboard',
      color: '#9c27b0',
    },
  ];

  const secondaryFeatures = [
    {
      title: '3D Visualization',
      description: 'Explore blood groups in interactive 3D',
      icon: <ScienceIcon fontSize="large" />,
      path: '/visualization',
    },
    {
      title: 'Security',
      description: 'Your data is protected with advanced security',
      icon: <SecurityIcon fontSize="large" />,
      path: '/security',
    },
    {
      title: 'Feedback',
      description: 'Share your experience and help us improve',
      icon: <FeedbackIcon fontSize="large" />,
      path: '/feedback',
    },
  ];

  return (
    <Box sx={{ py: 4 }}>
      {/* Hero Section */}
      <Paper
        elevation={0}
        sx={{
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)'
            : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          color: theme.palette.mode === 'dark' ? 'white' : 'text.primary',
          py: 6,
          px: { xs: 2, sm: 4 },
          borderRadius: 4,
          mb: 6,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  }}
                >
                  Discover Your Blood Group with AI
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ mb: 4, opacity: 0.9, fontWeight: 400 }}
                >
                  Advanced technology meets medical science for accurate predictions
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  {!isAuthenticated ? (
                    <>
                      <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/ai-predictor')}
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          fontWeight: 500,
                        }}
                      >
                        Get Started
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate('/login')}
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          fontWeight: 500,
                        }}
                      >
                        Sign In
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/ai-predictor')}
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 500,
                      }}
                    >
                      Start Prediction
                    </Button>
                  )}
                </Stack>
              </MotionBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  component="img"
                  src="/hero-image.svg"
                  alt="Blood Group Analysis"
                  sx={{
                    maxWidth: '100%',
                    height: 'auto',
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))',
                  }}
                />
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Main Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 1, fontWeight: 700 }}
        >
          Key Features
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Discover what our platform has to offer
        </Typography>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  elevation={2}
                  sx={{ 
                    height: '100%',
                    borderRadius: 2,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardActionArea onClick={() => navigate(feature.path)} sx={{ height: '100%' }}>
                    <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: feature.color, 
                          width: 56, 
                          height: 56, 
                          mb: 2,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {feature.icon}
                      </Avatar>
                      <Typography
                        variant="h6"
                        align="center"
                        sx={{ mb: 1, fontWeight: 600 }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        align="center"
                        color="text.secondary"
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Secondary Features Section */}
      <Box sx={{ bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'grey.50', py: 6, mb: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 1, fontWeight: 700 }}
          >
            More Features
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Explore additional tools and resources
          </Typography>
          <Grid container spacing={3}>
            {secondaryFeatures.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3,
                      cursor: 'pointer',
                    },
                  }}
                  onClick={() => navigate(feature.path)}
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: theme.palette.primary.main, 
                      width: 48, 
                      height: 48, 
                      mb: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{ mb: 1, fontWeight: 600 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
        <Paper
          elevation={2}
          sx={{
            p: 4,
            borderRadius: 2,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)'
              : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            color: theme.palette.mode === 'dark' ? 'white' : 'text.primary',
          }}
        >
          <Box
            sx={{
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h4"
              sx={{ mb: 2, fontWeight: 700 }}
            >
              Ready to Discover Your Blood Group?
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 3, opacity: 0.9 }}
            >
              Join thousands of users who have already discovered their blood group using our AI-powered platform.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(isAuthenticated ? '/ai-predictor' : '/signup')}
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500,
                px: 4,
              }}
            >
              {isAuthenticated ? 'Start Prediction' : 'Sign Up Now'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home; 