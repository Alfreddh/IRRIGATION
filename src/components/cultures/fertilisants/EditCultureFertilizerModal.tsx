import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ChangeEvent, useState } from 'react';
import type { Fertilizer } from '@/interfaces';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface EditFertilizerModalProps {
  fertilizer: Fertilizer;
  onClose: () => void;
  onSave: (fertilizer: Fertilizer) => void;
}

const culturesList = ["Tomate", "Poivron", "Oignon", "Piment", "Beterave"]

const phasesList = ['Préparation du sol', 'Semis', 'Croissance', 'Récolte', 'Irrigation']

const EditFertilizerModal: React.FC<EditFertilizerModalProps> = ({ fertilizer, onClose, onSave }) => {
  const [updatedFertilizer, setUpdatedFertilizer] = useState<Fertilizer>(fertilizer);



  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setUpdatedFertilizer(prevFertilizer => ({
      ...prevFertilizer,
      [name]: value,
    }));

  };

  const handleSave = () => {
    try {

        // Appel API pour update l'utilisateur
        // await updateCulture(cultureId);

        onSave(updatedFertilizer);

        
        // Afficher une notification de succès (si vous avez un système de notification)
        // showNotification('Culture successfully updated);
      } catch (error) {
        console.error('Error deleting culture:', error);
        // Afficher une notification d'erreur
        // showNotification('Error deleting culture', 'error');
      } 
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit Phase</DialogTitle>
      <DialogContent>
      <TextField
            fullWidth
            margin="normal"
            label="Fertilisant"
            name="fertilisant"
            value={updatedFertilizer.fertilisant}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth>
            <InputLabel>Culture</InputLabel>
            <Select
              label='Culture'
              name='culture'
              value={updatedFertilizer.culture}
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
            type='number'
            name="quantite"
            value={updatedFertilizer.quantite}
            onChange={handleChange}
            required
          />

          <FormControl fullWidth>
            <InputLabel>Phases d'application des engrais</InputLabel>
            <Select
              label="Phases d'application des engrais"
              name='phase_application_engrais'
              value={updatedFertilizer.phase_application_engrais}
              onChange={handleChange}
            >
            {phasesList.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
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

export default EditFertilizerModal;
