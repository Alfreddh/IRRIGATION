import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, FormControl, InputLabel, Select, Chip, MenuItem } from '@mui/material';
import type { CapteurTanque } from '@/interfaces';

interface AddCapteurTanqueModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newCapteurTanque: Omit<CapteurTanque, 'id'>) => Promise<void>;
}

const AddCapteurTanqueModal: React.FC<AddCapteurTanqueModalProps> = ({ open, onClose, onAdd }) => {
  const [newCapteurTanque, setNewCapteurTanque] = useState({
    reference : '',
    capteurs: ['']
  });


  const capteursTanquesData = ['Capteur Température', 'Capteur Lumière', 'Capteur pH', 'Capteur Humidité']


  const handleDelete = (value: string) => {
    setNewCapteurTanque(current => ({
      ...current,
      capteurs: current.capteurs.filter(item => item !== value)
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    
    if (name === undefined) {
      console.warn('Name is undefined in handleChange');
      return;
    }
  
    if (name === 'capteurs') {
      setNewCapteurTanque(prevCapteurTanque => ({
        ...prevCapteurTanque,
        capteurs: Array.isArray(value) ? value : prevCapteurTanque.capteurs
      }));
    } else {
      setNewCapteurTanque(prevCapteurTanque => ({
        ...prevCapteurTanque,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAdd(newCapteurTanque);
    onClose();
    setNewCapteurTanque({ 
      reference : '',
      capteurs: ['']
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
          Ajouter un Capteur Tanque
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Référence"
            name="reference"
            value={newCapteurTanque.reference}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth>
          <InputLabel>Capteurs</InputLabel>
          <Select
            multiple
            label='Capteurs'
            name='capteurs'
            value={newCapteurTanque.capteurs}
            onChange={(e) => handleChange(e as React.ChangeEvent<{ name?: string; value: unknown }>)}
            renderValue={selected => (
              <div className='flex flex-wrap gap-2'>
                {(selected as string[]).map(value => (
                  <Chip
                    key={value}
                    clickable
                    deleteIcon={
                      <i className='ri-close-circle-fill' onMouseDown={event => event.stopPropagation()} />
                    }
                    size='small'
                    label={value}
                    onDelete={() => handleDelete(value)}
                  />
                ))}
              </div>
            )}
          >
            {capteursTanquesData.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
          </FormControl>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color='secondary' onClick={onClose} sx={{ mr: 1 }}>Annuler</Button>
            <Button type="submit" variant="contained" color="primary">Ajouter </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddCapteurTanqueModal;
