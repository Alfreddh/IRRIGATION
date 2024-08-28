import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import type { Tanque } from '@/interfaces';
import { validateForm } from '@/views/Validations/edit-add';

interface EditTanqueModalProps {
  tanque: Tanque;
  onClose: () => void;
  onSave: (tanque: Tanque) => void;
}

const EditTanqueModal: React.FC<EditTanqueModalProps> = ({ tanque, onClose, onSave }) => {
  const [updatedTanque, setUpdatedTanque] = useState<Tanque>(tanque);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedTanque(prevTanque => ({
      ...prevTanque,
      [name]: value,
    }));


  };

  const handleSave = () => {
    try {

        // Appel API pour supprimer l'utilisateur
        // await updateTanque(tanqueId);

        onSave(updatedTanque);

        
        // Afficher une notification de succès (si vous avez un système de notification)
        // showNotification('Tanque successfully updated);
      } catch (error) {
        console.error('Error deleting Tanque:', error);
        // Afficher une notification d'erreur
        // showNotification('Error deleting Tanque', 'error');
      } 
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit Tanque</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Type de Tanque"
          name="type"
          value={updatedTanque.type}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          margin="dense"
          label="Capacité en Litres"
          name="capacity"
          value={updatedTanque.capacity}
          onChange={handleChange}
          fullWidth
          required
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

export default EditTanqueModal;
