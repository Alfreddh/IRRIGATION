import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import type { Culture } from '@/interfaces';


interface AddCultureModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newCulture: Omit<Culture, 'id'>) => Promise<void>;
}

const AddCultureModal: React.FC<AddCultureModalProps> = ({ open, onClose, onAdd }) => {
  const [newCulture, setNewCulture] = useState({
    culture: "",
    serre: "",
    superficie: 0
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCulture(prev => ({ ...prev, [name]: value }));

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    await onAdd(newCulture);
    onClose();
    setNewCulture({ culture: "", serre: "", superficie: 0 }); // Réinitialiser le formulaire
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
          Add New Culture
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Culture"
            name="culture"
            value={newCulture.culture}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Serre"
            name="serre"
            value={newCulture.serre}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Superficie"
            name="superficie"
            value={newCulture.superficie}
            onChange={handleChange}
            required
          />
          {/* Ajoutez d'autres champs selon votre modèle d'utilisateur */}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color='secondary' onClick={onClose} sx={{ mr: 1 }}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Add Culture</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddCultureModal;