import React, { ChangeEvent, useState } from 'react';
import { Modal, Box, TextField, Button, Typography, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import type { Capteur } from '@/interfaces';


interface AddCapteurModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newCapteur: Omit<Capteur, 'id'>) => Promise<void>;
}

const AddCapteurModal: React.FC<AddCapteurModalProps> = ({ open, onClose, onAdd }) => {
  const [newCapteur, setNewCapteur] = useState({
    capteur: "",
    type: ""
  });


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setNewCapteur(prev => ({ ...prev, [name]: value }));

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    await onAdd(newCapteur);
    onClose();
    setNewCapteur({ type: "", capteur: "" }); // Réinitialiser le formulaire
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
          Ajouter un capteur
        </Typography>
        <form onSubmit={handleSubmit}>
        <TextField
            fullWidth
            margin="normal"
            label="Capteur ou Actionneur"
            name="capteur"
            value={newCapteur.capteur}
            onChange={handleChange}
            required
          />

          {/* <TextField
            fullWidth
            margin="normal"
            label="Type"
            name="type"
            value={newCapteur.type}
            onChange={handleChange}
            required
          /> */}

          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              label='Type'
              name='type'
              value={newCapteur.type}
              onChange={handleChange}
            >
              <MenuItem value={"Capteur de Niveau"}>Capteur de Niveau</MenuItem>
              <MenuItem value={"Capteur d'Humidite"}>Capteur d'Humidité</MenuItem>
              <MenuItem value={"Electrovanne"}>Electrovanne</MenuItem>
              <MenuItem value={"Pompe"}>Pompe</MenuItem>
              <MenuItem value={"Mixeur"}>Mixeur</MenuItem>
            </Select>
          </FormControl>
          
          
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

export default AddCapteurModal;