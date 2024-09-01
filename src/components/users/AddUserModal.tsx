import React, { ChangeEvent, useState } from 'react';
import { Modal, Box, TextField, Button, Typography, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import type { User } from '@/interfaces';
import { validateForm } from '@/views/Validations/edit-add';

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newUser: Omit<User, 'id'>) => Promise<void>;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ open, onClose, onAdd }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    phone: '',
    password: '',
    role: 'User'
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));

    // Valider le champ spécifique
    const fieldErrors = validateForm({ [name]: value });

    setErrors({
      ...errors,
      [name]: fieldErrors[name] || ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm(newUser);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    await onAdd(newUser);
    onClose();
    setNewUser({ name: '', phone: '', password: '', role: 'User' }); // Réinitialiser le formulaire
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Add New User
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Téléphone"
            name="phone"
            type="phone"
            value={newUser.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              label='Role'
              name='role'
              value={newUser.role}
              onChange={handleChange}
            >
              <MenuItem value={"User"}>User</MenuItem>
              <MenuItem value={"Admin"}>Admin</MenuItem>
            </Select>
          </FormControl>


          {/* Ajoutez d'autres champs selon votre modèle d'utilisateur */}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color='secondary' onClick={onClose} sx={{ mr: 1 }}>Annuler</Button>
            <Button type="submit" variant="contained" color="primary">Ajouter</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddUserModal;