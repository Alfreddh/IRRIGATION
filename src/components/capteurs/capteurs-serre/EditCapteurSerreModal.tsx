import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import type { CapteurSerre } from '@/interfaces';
import { Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material';




interface EditCapteurSerreModalProps {
  capteurSerre: CapteurSerre;
  onClose: () => void;
  onSave: (capteurSerre: CapteurSerre) => void;
}

const EditCapteurSerreModal: React.FC<EditCapteurSerreModalProps> = ({ capteurSerre, onClose, onSave }) => {
  const [updatedCapteurSerre, setUpdatedCapteurSerre] = useState<CapteurSerre>(capteurSerre);


  const capteursSerresData = ['Capteur Température', 'Capteur Lumière', 'Capteur pH', 'Capteur Humidité']


  const handleDelete = (value: string) => {
    setUpdatedCapteurSerre(current => ({
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
      setUpdatedCapteurSerre(prevCapteurSerre => ({
        ...prevCapteurSerre,
        capteurs: Array.isArray(value) ? value : prevCapteurSerre.capteurs
      }));
    } else {
      setUpdatedCapteurSerre(prevCapteurSerre => ({
        ...prevCapteurSerre,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    try {

        // Appel API pour update l'utilisateur
        // await updateCulture(cultureId);

        onSave(updatedCapteurSerre);

        
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
      <DialogTitle>Modifier Capteurs</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Référence"
          name="reference"
          value={updatedCapteurSerre.reference}
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
          value={updatedCapteurSerre.capteurs}
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

export default EditCapteurSerreModal;
