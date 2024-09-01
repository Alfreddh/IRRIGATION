'use client'

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

import { deleteUser } from '../views/dashboard/users/request-button';

interface ActionButtonsProps {
  userId: string | number;
  onEdit: () => void;
  onDelete: (userId: string | number) => void;
}


export const ActionButtons: React.FC<ActionButtonsProps> = ({ userId, onEdit, onDelete }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async () => {
    
    setIsDeleting(true);
    try {
      // Appel API pour supprimer l'utilisateur
      // await deleteUser(userId);
      
      // Fermer le dialogue
      setOpenDeleteDialog(false);
      
      // Appeler la fonction onDelete du parent
      onDelete(userId);
      
      
      // Afficher une notification de succès (si vous avez un système de notification)
      // showNotification('User successfully deleted');
    } catch (error) {
      console.error('Error deleting user:', error);
      // Afficher une notification d'erreur
      // showNotification('Error deleting user', 'error');
    } finally {
      setIsDeleting(false);
    }
  };


  return (
    <>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button
          color="info"
          onClick={onEdit}
          // startIcon={<EditIcon />}
        >
          Modifier
        </Button>
        <Button
          color="error"
          onClick={() => setOpenDeleteDialog(true)}
          // startIcon={<DeleteIcon />}
        >
          Supprimer
        </Button>
      </ButtonGroup>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Etes vous sure de vouloir supprimer cet utilisateur ? Cette action n'est pas remédiable...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} variant='outlined' color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant='contained' color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};


