import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import type { Capteur } from '@/interfaces';
import { validateForm } from '@/views/Validations/edit-add';

interface EditCapteurModalProps {
  capteur: Capteur;
  onClose: () => void;
  onSave: (capteur: Capteur) => void;
}

const EditCapteurModal: React.FC<EditCapteurModalProps> = ({ capteur, onClose, onSave }) => {
  const [updatedCapteur, setUpdatedCapteur] = useState<Capteur>(capteur);

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedCapteur(prevCapteur => ({
      ...prevCapteur,
      [name]: value,
    }));

    // Valider le champ spécifique
    const fieldErrors = validateForm({ [name]: value });

    setErrors({
      ...errors,
      [name]: fieldErrors[name] || ''
    });

  };

  const handleSave = () => {
    try {

      const formErrors = validateForm(updatedCapteur);
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }

        // Appel API pour supprimer l'utilisateur
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

        <TextField
          margin="dense"
          label="Type"
          name="type"
          value={updatedCapteur.type}
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

export default EditCapteurModal;
