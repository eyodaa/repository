import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function UnauthorizedPage() {
    const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="md" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" color="error" gutterBottom>
                    403 - Unauthorized
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                    You do not have permission to access this page.
                </Typography>
                <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
                    Return to Home
                </Button>
            </Box>
        </Container>
    );
}
