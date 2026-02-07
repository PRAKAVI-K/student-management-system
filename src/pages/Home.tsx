import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Users, GraduationCap, TrendingUp } from 'lucide-react';

const Home = () => {
    return (
        <Box>
            {/* Hero Section */}
            <Box sx={{
                textAlign: 'center',
                py: 8,
                background: 'linear-gradient(180deg, rgba(108, 99, 255, 0.1) 0%, rgba(10, 10, 10, 0) 100%)',
                borderRadius: 4,
                mb: 6
            }}>
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800, background: 'linear-gradient(45deg, #6C63FF, #00D4FF)', backgroundClip: 'text', textFillColor: 'transparent', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Lumina Learners
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
                    Empowering the next generation with smart student management.
                </Typography>
                <Button
                    component={RouterLink}
                    to="/students"
                    variant="contained"
                    size="large"
                    sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
                >
                    Manage Students
                </Button>
            </Box>

            {/* Quick Stats / Dashboard Widgets */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 4 }}>
                        <Users size={48} color="#6C63FF" style={{ marginBottom: 16 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>1,248</Typography>
                        <Typography variant="body1" color="text.secondary">Total Students</Typography>
                    </CardContent>
                </Card>

                <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 4 }}>
                        <GraduationCap size={48} color="#00D4FF" style={{ marginBottom: 16 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>98%</Typography>
                        <Typography variant="body1" color="text.secondary">Graduation Rate</Typography>
                    </CardContent>
                </Card>

                <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 4 }}>
                        <TrendingUp size={48} color="#A096FF" style={{ marginBottom: 16 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>+12%</Typography>
                        <Typography variant="body1" color="text.secondary">New Enrollments</Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default Home;
