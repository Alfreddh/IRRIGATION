import React, { ChangeEvent, useState } from 'react';
import { Modal, Box, TextField, Button, Typography, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import type { Fertilizer } from '@/interfaces';
;

interface AddFertilizerModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newPhase: Omit<Fertilizer, 'id'>) => Promise<void>;
}

const culturesList = ["Tomate", "Poivron", "Oignon", "Piment", "Beterave"]

const phasesList = ['Préparation du sol', 'Semis', 'Croissance', 'Récolte', 'Irrigation']

const AddFertilizerModal: React.FC<AddFertilizerModalProps> = ({ open, onClose, onAdd }) => {
  const [newFertilizer, setNewFertilizer] = useState({
    fertilisant: '',
    quantite: 0,
    culture: '',
    phase_application_engrais: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setNewFertilizer(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAdd(newFertilizer);
    onClose();
    setNewFertilizer({ 
      fertilisant: '',
      quantite: 0,
      culture: '',
      phase_application_engrais: ''
    }); // Réinitialiser le formulaire
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
          Ajouter un fertilisant
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Fertilisant"
            name="fertilisant"
            value={newFertilizer.fertilisant}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth>
            <InputLabel>Culture</InputLabel>
            <Select
              label='Culture'
              name='culture'
              value={newFertilizer.culture}
              onChange={handleChange}
            >
            {culturesList.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="Quantité"
            name="quantite"
            type='number'
            value={newFertilizer.quantite}
            onChange={handleChange}
            required
          />

          <FormControl fullWidth>
            <InputLabel>Phases d'application des engrais</InputLabel>
            <Select
              label="Phases d'application des engrais"
              name='phase_application_engrais'
              value={newFertilizer.phase_application_engrais}
              onChange={handleChange}
            >
            {phasesList.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
            </Select>
          </FormControl>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color='secondary' onClick={onClose} sx={{ mr: 1 }}>Annuler</Button>
            <Button type="submit" variant="contained" color="primary">Ajouter</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddFertilizerModal;
