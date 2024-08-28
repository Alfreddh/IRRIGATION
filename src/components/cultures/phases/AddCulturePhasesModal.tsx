import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import type { Phase } from '@/interfaces';

interface AddPhaseModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newPhase: Omit<Phase, 'id'>) => Promise<void>;
}

const AddPhaseModal: React.FC<AddPhaseModalProps> = ({ open, onClose, onAdd }) => {
  const [newPhase, setNewPhase] = useState({
    culture: "",
    phases: [''],
    startPeriod: new Date(), 
    endPeriod: new Date()
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPhase(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAdd(newPhase);
    onClose();
    setNewPhase({ 
      culture: "",
      phases: [''],
      startPeriod: new Date(), 
      endPeriod: new Date() 
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
          Add New Phase
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Culture"
            name="culture"
            value={newPhase.culture}
            onChange={handleChange}
            required
          />
          {/* <TextField
            fullWidth
            margin="normal"
            label="Phase de la culture"
            name="phases"
            value={newPhase.phases}
            onChange={handleChange}
            required
          /> */}

          <TextField
            margin="dense"
            label="Phases de la culture"
            name="phases"
            value={newPhase.phases.join(', ')} // Convert array to string
            onChange={(e) => {
              const value = e.target.value;
              setNewPhase(prev => ({
                ...prev,
                phases: value.split(',').map(phase => phase.trim()) // Convert string back to array
              }));
            }}
            fullWidth
          />

          <TextField
            fullWidth
            margin="normal"
            label="Période de début"
            name="startPeriod"
            type="date"
            value={newPhase.startPeriod}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Période de fin"
            name="endPeriod"
            type="date"
            value={newPhase.endPeriod}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color='secondary' onClick={onClose} sx={{ mr: 1 }}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Add Phase</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddPhaseModal;
