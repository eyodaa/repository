import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Alert,
    IconButton,
    Divider,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

import { useAuth, type Role } from "../../context/AuthContext";
import api from "../../api/axios";
import AuditLogViewer from "../../components/admin/AuditLogViewer";

interface UserData {
    id: number;
    username: string;
    role: Role;
}

export default function UsersPage() {
    const { user } = useAuth();

    const [users, setUsers] = useState<UserData[]>([]);

    // Dialog state
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingUserId, setEditingUserId] = useState<number | null>(null);

    // Form state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<Role>("APPLICATION_ADMIN");
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetch all users
     */
    const fetchUsers = async () => {
        try {
            const res = await api.get("/users");
            setUsers(res.data);
        } catch (err) {
            console.error("Failed to fetch users", err);
        }
    };

    /**
     * Only SYSTEM_ADMIN can manage users.
     */
    useEffect(() => {
        if (user?.role === "SYSTEM_ADMIN") {
            fetchUsers();
        }
    }, [user]);

    /**
     * Open Add/Edit dialog
     */
    const handleOpenDialog = (u?: UserData) => {
        setError(null);

        if (u) {
            // Edit existing user
            setIsEditing(true);
            setEditingUserId(u.id);
            setUsername(u.username);
            setPassword("");
            setRole(u.role);
        } else {
            // Add new user
            setIsEditing(false);
            setEditingUserId(null);
            setUsername("");
            setPassword("");
            setRole("APPLICATION_ADMIN");
        }

        setOpen(true);
    };

    /**
     * Close dialog
     */
    const handleCloseDialog = () => {
        setOpen(false);
        setError(null);
    };

    /**
     * Create or update user
     */
    const handleSaveUser = async () => {
        setError(null);

        if (!username.trim()) {
            setError("Username is required.");
            return;
        }

        if (!isEditing && !password.trim()) {
            setError("Please enter a password.");
            return;
        }

        try {
            if (isEditing && editingUserId) {
                await api.put(`/users/${editingUserId}`, {
                    username,
                    password,
                    role,
                });
            } else {
                await api.post("/users", {
                    username,
                    password,
                    role,
                });
            }

            setOpen(false);
            fetchUsers();
        } catch (err) {
            console.error("Failed to save user", err);
            setError(
                "Failed to save user. Username might already exist."
            );
        }
    };

    /**
     * Delete user
     */
    const handleDeleteUser = async (id: number) => {
        if (
            !window.confirm(
                "Are you sure you want to delete this user?"
            )
        ) {
            return;
        }

        try {
            await api.delete(`/users/${id}`);
            fetchUsers();
        } catch (err) {
            console.error("Failed to delete user", err);
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            {/* Page Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 4,
                }}
            >
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            mb: 1,
                        }}
                    >
                        Administration
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                    >
                        Manage system users and review audit activity.
                    </Typography>
                </Box>

                {user?.role === "SYSTEM_ADMIN" && (
                    <Button
                        variant="contained"
                        onClick={() => handleOpenDialog()}
                    >
                        Add User
                    </Button>
                )}
            </Box>

            {/* =========================
                USER MANAGEMENT
            ========================== */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    mb: 4,
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        mb: 3,
                    }}
                >
                    User Management
                </Typography>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell align="right">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {users.length > 0 ? (
                                users.map((u) => (
                                    <TableRow key={u.id}>
                                        <TableCell>
                                            {u.id}
                                        </TableCell>

                                        <TableCell>
                                            {u.username}
                                        </TableCell>

                                        <TableCell>
                                            {u.role}
                                        </TableCell>

                                        <TableCell align="right">
                                            <IconButton
                                                onClick={() =>
                                                    handleOpenDialog(u)
                                                }
                                                color="primary"
                                            >
                                                <Edit />
                                            </IconButton>

                                            <IconButton
                                                onClick={() =>
                                                    handleDeleteUser(u.id)
                                                }
                                                color="error"
                                            >
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        align="center"
                                    >
                                        <Typography
                                            color="text.secondary"
                                            sx={{ py: 3 }}
                                        >
                                            No users found.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* =========================
                AUDIT LOG
            ========================== */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        mb: 1,
                    }}
                >
                    Audit Logs
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Review system activity and administrative actions.
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <AuditLogViewer />
            </Paper>

            {/* =========================
                ADD / EDIT USER DIALOG
            ========================== */}
            <Dialog
                open={open}
                onClose={handleCloseDialog}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    {isEditing ? "Edit User" : "Add New User"}
                </DialogTitle>

                <DialogContent>
                    {error && (
                        <Alert
                            severity="error"
                            sx={{ mb: 2 }}
                        >
                            {error}
                        </Alert>
                    )}

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Username"
                        fullWidth
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />

                    <TextField
                        margin="dense"
                        label={
                            isEditing
                                ? "New Password (leave blank to keep current)"
                                : "Password"
                        }
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <FormControl
                        fullWidth
                        margin="dense"
                        sx={{ mt: 2 }}
                    >
                        <InputLabel>Role</InputLabel>

                        <Select
                            value={role}
                            label="Role"
                            onChange={(e) =>
                                setRole(e.target.value as Role)
                            }
                        >
                            <MenuItem value="SYSTEM_ADMIN">
                                System Admin
                            </MenuItem>

                            <MenuItem value="APPLICATION_ADMIN">
                                Application Admin
                            </MenuItem>

                            <MenuItem value="TECHNOLOGY_ADMIN">
                                Technology Admin
                            </MenuItem>

                            <MenuItem value="PROCESS_ADMIN">
                                Process Admin
                            </MenuItem>

                            <MenuItem value="BUSINESS_ADMIN">
                                Business Admin
                            </MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseDialog}>
                        Cancel
                    </Button>

                    <Button
                        onClick={handleSaveUser}
                        variant="contained"
                    >
                        {isEditing ? "Save" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

