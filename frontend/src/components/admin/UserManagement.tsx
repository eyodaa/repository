import {
    Box,
    Typography,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    IconButton,
    Alert,
    CircularProgress,
} from "@mui/material";
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";

import { useState, useEffect } from "react";

import { userService } from "../../services/userService";
import type { User, CreateUserRequest, UpdateUserRequest } from "../../types/user";
import { Role } from "../../types/user";

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: Role.APPLICATION_ADMIN as Role,
    });

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
        try {
            setLoading(true);
            const data = await userService.getAllUsers();
            setUsers(data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to load users");
        } finally {
            setLoading(false);
        }
    }

    function handleOpenDialog(user: User | null = null) {
        if (user) {
            setEditingUser(user);
            setFormData({
                username: user.username,
                password: "",
                role: user.role,
            });
        } else {
            setEditingUser(null);
            setFormData({
                username: "",
                password: "",
                role: Role.APPLICATION_ADMIN,
            });
        }
        setDialogOpen(true);
    }

    async function handleSave() {
        setSaving(true);
        try {
            if (editingUser) {
                const updateRequest: UpdateUserRequest = {
                    username: formData.username,
                    role: formData.role,
                };
                if (formData.password) {
                    updateRequest.password = formData.password;
                }
                await userService.updateUser(editingUser.id, updateRequest);
            } else {
                const createRequest: CreateUserRequest = {
                    username: formData.username,
                    password: formData.password,
                    role: formData.role,
                };
                await userService.createUser(createRequest);
            }
            setDialogOpen(false);
            await loadUsers();
        } catch (err) {
            console.error(err);
            setError(editingUser ? "Failed to update user" : "Failed to create user");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(user: User) {
        if (!window.confirm(`Are you sure you want to delete user ${user.username}?`)) {
            return;
        }
        try {
            await userService.deleteUser(user.id);
            await loadUsers();
        } catch (err) {
            console.error(err);
            setError("Failed to delete user");
        }
    }

    function getRoleColor(role: Role): "default" | "primary" | "secondary" | "success" | "error" | "info" | "warning" {
        switch (role) {
            case Role.SYSTEM_ADMIN:
                return "error";
            case Role.APPLICATION_ADMIN:
                return "primary";
            case Role.TECHNOLOGY_ADMIN:
                return "info";
            case Role.PROCESS_ADMIN:
                return "success";
            case Role.BUSINESS_ADMIN:
                return "warning";
            default:
                return "default";
        }
    }

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 3,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    User Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                    size="small"
                >
                    Add User
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
                    {error}
                </Alert>
            )}

            <Box
                sx={{
                    display: "grid",
                    gap: 2,
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                }}
            >
                {users.map((user) => (
                    <Box
                        key={user.id}
                        sx={{
                            p: 2,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {user.username}
                            </Typography>
                            <Chip
                                label={user.role.replace("_", " ")}
                                size="small"
                                color={getRoleColor(user.role)}
                                sx={{ mt: 1 }}
                            />
                        </Box>
                        <Box>
                            <IconButton
                                size="small"
                                onClick={() => handleOpenDialog(user)}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDelete(user)}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>
                ))}
            </Box>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>{editingUser ? "Edit User" : "Create User"}</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                        <TextField
                            label="Username"
                            fullWidth
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder={editingUser ? "Leave blank to keep current password" : ""}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Role</InputLabel>
                            <Select
                                value={formData.role}
                                label="Role"
                                onChange={(e) => setFormData({ ...formData, role: e.target.value as Role })}
                            >
                                <MenuItem value={Role.SYSTEM_ADMIN}>System Admin</MenuItem>
                                <MenuItem value={Role.APPLICATION_ADMIN}>Application Admin</MenuItem>
                                <MenuItem value={Role.TECHNOLOGY_ADMIN}>Technology Admin</MenuItem>
                                <MenuItem value={Role.PROCESS_ADMIN}>Process Admin</MenuItem>
                                <MenuItem value={Role.BUSINESS_ADMIN}>Business Admin</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        disabled={saving || !formData.username || (!editingUser && !formData.password)}
                    >
                        {saving ? <CircularProgress size={20} /> : editingUser ? "Update" : "Create"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}
