import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import type { Culture } from '@/interfaces';

interface AddCultureModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newCulture: Omit<Culture, 'id'>) => Promise<void>;
}

const existingSerresList = ["Serre A", "Serre B", "Serre C", "Serre D", "Serre E"];

const AddCultureModal: React.FC<AddCultureModalProps> = ({ open, onClose, onAdd }) => {
  const [newCulture, setNewCulture] = useState({
    culture: "",
    serre: "",
    superficie: 0
  });

  useEffect(() => {
    // Déterminer la prochaine serre disponible
    const lastSerre = existingSerresList[existingSerresList.length - 1];
    const nextSerre = `Serre ${String.fromCharCode(lastSerre.charCodeAt(6) + 1)}`; // Passer de "Serre D" à "Serre E", etc.

    // Mettre à jour le champ 'serre' avec la prochaine serre
    setNewCulture(prev => ({ ...prev, serre: nextSerre }));
  }, []); // Exécuter cet effet une seule fois lors du montage du composant

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
            disabled // Désactive le champ pour qu'il soit grisé
          />
          <TextField
            fullWidth
            margin="normal"
            label="Superficie"
            type='number'
            name="superficie"
            value={newCulture.superficie}
            onChange={handleChange}
            required
          />
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
