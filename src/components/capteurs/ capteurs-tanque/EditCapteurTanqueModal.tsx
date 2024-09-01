import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import type { CapteurTanque } from '@/interfaces';
import { Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material';




interface EditCapteurTanqueModalProps {
  capteurTanque: CapteurTanque;
  onClose: () => void;
  onSave: (capteurTanque: CapteurTanque) => void;
}

const EditCapteurTanqueModal: React.FC<EditCapteurTanqueModalProps> = ({ capteurTanque, onClose, onSave }) => {
  const [updatedCapteurTanque, setUpdatedCapteurTanque] = useState<CapteurTanque>(capteurTanque);


  const capteursTanquesData = ['Capteur Température', 'Capteur Lumière', 'Capteur pH', 'Capteur Humidité']


  const handleDelete = (value: string) => {
    setUpdatedCapteurTanque(current => ({
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
      setUpdatedCapteurTanque(prevCapteurTanque => ({
        ...prevCapteurTanque,
        capteurs: Array.isArray(value) ? value : prevCapteurTanque.capteurs
      }));
    } else {
      setUpdatedCapteurTanque(prevCapteurTanque => ({
        ...prevCapteurTanque,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    try {

        // Appel API pour update l'utilisateur
        // await updateCulture(cultureId);

        onSave(updatedCapteurTanque);

        
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
      <DialogTitle>Modifier les capteurs</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Référence"
          name="reference"
          value={updatedCapteurTanque.reference}
          onChange={handleChange}
          fullWidth
          required
        />

        <FormControl fullWidth>
        <InputLabel>Capteurs</InputLabel>
        <Select
          multiple
          label='Capteurs'
          name='capteurs'
          value={updatedCapteurTanque.capteurs}
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


        {/* Ajouter d'autres champs si nécessaire */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='contained' color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} variant='contained' color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCapteurTanqueModal;
