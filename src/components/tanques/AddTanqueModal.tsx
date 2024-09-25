import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import type { Tanque } from '@/interfaces';


interface AddTanqueModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newTanque: Omit<Tanque, 'id'>) => Promise<void>;
}

const AddTanqueModal: React.FC<AddTanqueModalProps> = ({ open, onClose, onAdd }) => {
  const [newTanque, setNewTanque] = useState({
    type: "",
    capacity: 0
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTanque(prev => ({ ...prev, [name]: value }));

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    await onAdd(newTanque);
    onClose();
    setNewTanque({ type: "", capacity: 0 }); // Réinitialiser le formulaire
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
          Ajouter un nouveau tanque
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Type de Réservoir"
            name="type"
            value={newTanque.type}
            onChange={handleChange}
            required
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Capacité en Litres"
            name="capacity"
            value={newTanque.capacity}
            onChange={handleChange}
            required
          />
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

export default AddTanqueModal;