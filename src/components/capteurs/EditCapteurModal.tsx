import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ChangeEvent, useState } from 'react';
import type { Capteur } from '@/interfaces';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface EditCapteurModalProps {
  capteur: Capteur;
  onClose: () => void;
  onSave: (capteur: Capteur) => void;
}

const EditCapteurModal: React.FC<EditCapteurModalProps> = ({ capteur, onClose, onSave }) => {
  const [updatedCapteur, setUpdatedCapteur] = useState<Capteur>(capteur);


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setUpdatedCapteur(prevCapteur => ({
      ...prevCapteur,
      [name]: value,
    }));

  };

  const handleSave = () => {
    try {
      console.log(updatedCapteur)
        // Appel API pour update l'utilisateur
        // await updateTanque(tanqueId);

        onSave(updatedCapteur);

        
        // Afficher une notification de succès (si vous avez un système de notification)
        // showNotification('Tanque successfully updated);
      } catch (error) {
        console.error('Error deleting Capteur:', error);
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
          label="Capteur ou Actionneur"
          name="capteur"
          value={updatedCapteur.capteur}
          onChange={handleChange}
          fullWidth
          required
        />

        {/* <TextField
          margin="dense"
          label="Type"
          name="type"
          value={updatedCapteur.type}
          onChange={handleChange}
          fullWidth
          required
        /> */}


        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            label='Type'
            name='type'
            value={updatedCapteur.type}
            onChange={handleChange}
          >
            <MenuItem value={"Capteur de Niveau"}>Capteur de Niveau</MenuItem>
            <MenuItem value={"Capteur d'Humidite"}>Capteur d'Humidité</MenuItem>
            <MenuItem value={"Electrovanne"}>Electrovanne</MenuItem>
            <MenuItem value={"Pompe"}>Pompe</MenuItem>
            <MenuItem value={"Mixeur"}>Mixeur</MenuItem>
          </Select>
        </FormControl>
        
        {/* Ajouter d'autres champs si nécessaire */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='contained' color="secondary">
          Annuler
        </Button>
        <Button onClick={handleSave} variant='contained' color="primary">
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCapteurModal;
