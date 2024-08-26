import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import type { User } from '@/interfaces';

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onSave: (user: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose, onSave }) => {
  const [updatedUser, setUpdatedUser] = useState<User>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = () => {
    try {
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
        />
        <TextField
          margin="dense"
          label="Username"
          name="username"
          value={updatedUser.username}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          value={updatedUser.email}
          onChange={handleChange}
          fullWidth
        />
        {/* Ajouter d'autres champs si nécessaire */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="secondary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserModal;
