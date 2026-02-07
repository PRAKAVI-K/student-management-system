import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography, Card, CardContent, Grid, Alert, CircularProgress } from '@mui/material';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import type { User } from '../config/schema';
import { UserSchema, userFormConfig } from '../config/schema';
import { useUsers } from '../hooks/useUsers';
import { MockApi } from '../services/mockApi'; // Direct API usage for single fetch

const UserForm = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addUser, updateUser } = useUsers();
    const [loadingData, setLoadingData] = React.useState(false);
    const [formError, setFormError] = React.useState<string | null>(null);

    const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<User>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        }
    });

    useEffect(() => {
        if (id) {
            setLoadingData(true);
            MockApi.getUser(id)
                .then(user => {
                    if (user) reset(user);
                    else setFormError("User not found");
                })
                .catch(() => setFormError("Failed to load user"))
                .finally(() => setLoadingData(false));
        }
    }, [id, reset]);

    const onSubmit = async (data: User) => {
        try {
            if (id) {
                await updateUser(id, data);
            } else {
                await addUser(data);
            }
            navigate('/students');
        } catch (err) {
            console.error(err);
            setFormError("Failed to save student");
        }
    };

    if (loadingData) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <CircularProgress />
        </Box>
    );

    return (
        <Box maxWidth="sm" sx={{ mx: 'auto' }}>
            <Button
                component={RouterLink}
                to="/students"
                startIcon={<ArrowLeft size={18} />}
                sx={{ mb: 3, color: 'text.secondary' }}
            >
                Back to Student Directory
            </Button>

            <Card>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
                        {id ? 'Edit Student' : 'Enroll New Student'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                        {id ? 'Update student details below' : 'Fill in the details to enroll a new student'}
                    </Typography>

                    {formError && <Alert severity="error" sx={{ mb: 3 }}>{formError}</Alert>}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3}>
                            {/* Extensibility: Dynamically rendering fields from config */}
                            {userFormConfig.map((field) => (
                                <Grid size={{ xs: 12 }} key={field.name}>
                                    <Controller
                                        name={field.name}
                                        control={control}
                                        render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                                            <TextField
                                                fullWidth
                                                label={field.label}
                                                variant="outlined"
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                error={!!error}
                                                helperText={error?.message}
                                                onChange={onChange}
                                                value={value || ''}
                                                inputRef={ref}
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        )}
                                    />
                                </Grid>
                            ))}

                            <Grid size={{ xs: 12 }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    disabled={isSubmitting}
                                    startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <Save size={18} />}
                                    sx={{ mt: 2, height: 50 }}
                                >
                                    {isSubmitting ? 'Saving...' : (id ? 'Update Student' : 'Enroll Student')}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserForm;
