import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import type { Culture } from '@/interfaces';


interface EditCultureModalProps {
  culture: Culture;
  onClose: () => void;
  onSave: (culture: Culture) => void;
}

const EditCultureModal: React.FC<EditCultureModalProps> = ({ culture, onClose, onSave }) => {
  const [updatedCulture, setUpdatedCulture] = useState<Culture>(culture);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedCulture(prevCulture => ({
      ...prevCulture,
      [name]: value,
    }));

  };

  const handleSave = () => {
    try {

        // Appel API pour supprimer l'utilisateur
        // await updateCulture(cultureId);

        onSave(updatedCulture);

        
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
      <DialogTitle>Edit Culture</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Culture"
          name="culture"
          value={updatedCulture.culture}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          margin="dense"
          label="Serre"
          name="serre"
          value={updatedCulture.serre}
          onChange={handleChange}
          fullWidth
          disabled
        />

        <TextField
          margin="dense"
          label="Superficie"
          name="superficie"
          type='number'
          value={updatedCulture.superficie}
          onChange={handleChange}
          fullWidth
          required
        />
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

export default EditCultureModal;
