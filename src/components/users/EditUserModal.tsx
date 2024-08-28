import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import type { User } from '@/interfaces';
import { validateForm } from '@/views/Validations/edit-add';

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onSave: (user: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose, onSave }) => {
  const [updatedUser, setUpdatedUser] = useState<User>(user);

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));

    // Valider le champ spécifique
    const fieldErrors = validateForm({ [name]: value });

    setErrors({
      ...errors,
      [name]: fieldErrors[name] || ''
    });

  };

  const handleSave = () => {
    try {

      const formErrors = validateForm(updatedUser);
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }

        // Appel API pour supprimer l'utilisateur
        // await updateUser(userId);

      onSave(updatedUser);

        
        // Afficher une notification de succès (si vous avez un système de notification)
        // showNotification('User successfully updated);
      } catch (error) {
        console.error('Error deleting user:', error);
        // Afficher une notification d'erreur
        // showNotification('Error deleting user', 'error');
      } 
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          name="name"
          value={updatedUser.name}
          onChange={handleChange}
          fullWidth
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          margin="dense"
          label="Téléphone"
          name="phone"
          value={updatedUser.phone}
          onChange={handleChange}
          fullWidth
          error={!!errors.phone}
          helperText={errors.phone}
        />

        <TextField
          margin="dense"
          label="Password"
          name="password"
          value={updatedUser.password}
          onChange={handleChange}
          fullWidth
          error={!!errors.password}
          helperText={errors.password}
        />
        {/* Ajouter d'autres champs si nécessaire */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='contained' color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} variant='contained' color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserModal;
