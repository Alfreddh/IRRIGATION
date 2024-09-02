import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, FormControl, InputLabel, Select, Chip, MenuItem, SelectChangeEvent } from '@mui/material';
import type { CapteurSerre } from '@/interfaces';

interface AddCapteurSerreModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newCapteurSerre: Omit<CapteurSerre, 'id'>) => Promise<void>;
}

const AddCapteurSerreModal: React.FC<AddCapteurSerreModalProps> = ({ open, onClose, onAdd }) => {
  const [newCapteurSerre, setNewCapteurSerre] = useState({
    reference : '',
    capteurs: ['']
  });


  const capteursSerresData = ['Capteur Température', 'Capteur Lumière', 'Capteur pH', 'Capteur Humidité']

  const serresList = ['Serre A', 'Serre B', 'Serre C', 'Serre D', 'Serre E'] // Cette liste devrait être obtenu par l'API depuis la base de donnée


  const handleDelete = (value: string) => {
    setNewCapteurSerre(current => ({
      ...current,
      capteurs: current.capteurs.filter(item => item !== value)
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    
    if (name === undefined) {
      console.warn('Name is undefined in handleChange');
      return;
    }
  
    if (name === 'capteurs') {
      setNewCapteurSerre(prevCapteurSerre => ({
        ...prevCapteurSerre,
        capteurs: Array.isArray(value) ? value : prevCapteurSerre.capteurs
      }));
    } else {
      setNewCapteurSerre(prevCapteurSerre => ({
        ...prevCapteurSerre,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAdd(newCapteurSerre);
    onClose();
    setNewCapteurSerre({ 
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
          Ajouter un capteur-serre
        </Typography>
        <form onSubmit={handleSubmit}>

        <FormControl fullWidth>
            <InputLabel>Référence de la serre</InputLabel>
            <Select
              label='Référence de la serre'
              name='reference'
              value={newCapteurSerre.reference}
              onChange={handleChange}
            >
            {serresList.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
            </Select>
          </FormControl>


          <FormControl fullWidth className='mt-5'>
          <InputLabel>Capteurs</InputLabel>
          <Select
            multiple
            label='Capteurs'
            name='capteurs'
            value={newCapteurSerre.capteurs}
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
            {capteursSerresData.map(name => (
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

export default AddCapteurSerreModal;
