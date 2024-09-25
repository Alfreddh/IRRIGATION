import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import type { Phase } from '@/interfaces';

interface EditPhaseModalProps {
  phase: Phase;
  onClose: () => void;
  onSave: (phase: Phase) => void;
}

const EditPhaseModal: React.FC<EditPhaseModalProps> = ({ phase, onClose, onSave }) => {
  const [updatedPhase, setUpdatedPhase] = useState<Phase>(phase);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedPhase(prevPhase => ({
      ...prevPhase,
      [name]: value,
    }));

  };

  const handleSave = () => {
    try {

        // Appel API pour update l'utilisateur
        // await updateCulture(cultureId);

        onSave(updatedPhase);

        
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
          margin="dense"
          label="Culture"
          name="culture"
          value={updatedPhase.culture}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          margin="dense"
          label="Phases de la culture"
          name="phases"
          value={updatedPhase.phases.join(', ')} // Convert array to string
          onChange={(e) => {
            const value = e.target.value;
            setUpdatedPhase(prev => ({
              ...prev,
              phases: value.split(',').map(phase => phase.trim()) // Convert string back to array
            }));
          }}
          fullWidth
          disabled
        />

        <TextField
            fullWidth
            margin="normal"
            label="Période de début"
            name="startPeriod"
            type="date"
            value={updatedPhase.startPeriod}
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
            value={updatedPhase.endPeriod}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
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

export default EditPhaseModal;
