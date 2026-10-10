import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Container, Alert } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import AppLogo from '../../components/ui/AppLogo';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (username.trim() && password.trim()) {
            try {
                await login(username, password);
                navigate(from, { replace: true });
            } catch (err) {
                setError('Invalid username or password.');
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', borderRadius: 2 }}>
                <AppLogo />
                <Typography component="h1" variant="h5" sx={{ mt: 3, mb: 2 }}>
                    Sign in
                </Typography>
                
                {error && (
                    <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, py: 1.5 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
