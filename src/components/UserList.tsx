import { useState } from 'react';
import {
    Box, Card, Typography, TextField, Button, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, IconButton, Chip, Skeleton
} from '@mui/material';
import { Edit, Trash2, UserPlus, Search } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { Link as RouterLink } from 'react-router-dom';

// Hook usage
const UserList = () => {
    const { users, loading, deleteUser } = useUsers();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await deleteUser(id);
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                        Student Directory <Typography component="span" variant="h5" color="text.secondary" sx={{ fontWeight: 400, ml: 1 }}>({users.length})</Typography>
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your students and their enrollment details here.
                    </Typography>
                </Box>
                <Button
                    component={RouterLink}
                    to="/students/add"
                    variant="contained"
                    startIcon={<UserPlus size={18} />}
                    sx={{ height: 48 }}
                >
                    Enroll Student
                </Button>
            </Box>

            <Card sx={{ border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center' }}>
                    <Search size={20} style={{ color: '#aaa', marginRight: 12 }} />
                    <TextField
                        placeholder="Search students..."
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead sx={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Status</TableCell> {/* Dummy column for UI */}
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                // Skeleton Loading State
                                [...Array(3)].map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell><Skeleton variant="text" width={120} /></TableCell>
                                        <TableCell><Skeleton variant="text" width={80} /></TableCell>
                                        <TableCell><Skeleton variant="text" width={150} /></TableCell>
                                        <TableCell><Skeleton variant="text" width={100} /></TableCell>
                                        <TableCell align="right"><Skeleton variant="circular" width={32} height={32} /></TableCell>
                                    </TableRow>
                                ))
                            ) : filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <TableRow key={user.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{user.firstName} {user.lastName}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip label="Active" size="small" color="success" variant="outlined" sx={{ height: 24, fontSize: '0.75rem' }} />
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                component={RouterLink}
                                                to={`/students/edit/${user.id}`}
                                                size="small"
                                                sx={{ mr: 1, color: 'primary.light' }}
                                            >
                                                <Edit size={18} />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => user.id && handleDelete(user.id)}
                                                sx={{ color: '#ff4b4b' }}
                                            >
                                                <Trash2 size={18} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                                        <Typography variant="h6" color="text.secondary">No students found</Typography>
                                        <Button component={RouterLink} to="/students/add" sx={{ mt: 1 }}>Enroll a new student</Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
};

export default UserList;
