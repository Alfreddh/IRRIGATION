'use client'

// MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import {Button, Box} from '@mui/material';

// // Third-party Imports
// import classnames from 'classnames'

// // Components Imports
// import CustomAvatar from '@/core/components/mui/Avatar'

// Styles Imports
import tableStyles from '@/core/styles/table.module.css'
import { useState } from 'react'

import { ActionButtons } from '@/components/ActionButtons';

import type { CapteurTanque } from '@/interfaces'

import AddCapteurTanqueModal from '@/components/capteurs/ capteurs-tanque/AddCapteurTanqueModal';
import EditCapteurTanqueModal from '@/components/capteurs/ capteurs-tanque/EditCapteurTanqueModal';

type TableBodyRowType = CapteurTanque

// Vars
const rowsData: TableBodyRowType[] = [
    {
      id: 1,
      reference: "Tanque 001",
      capteurs: ["Capteur Niveau"]
    },
    {
      id: 2,
      reference: "Tanque 002",
      capteurs: ["Capteur Niveau"]
    },
    {
      id: 3,
      reference: "Tanque 003",
      capteurs: ["Capteur Niveau"]
    },
    {
      id: 4,
      reference: "Tanque 004",
      capteurs: ["Capteur Niveau"]
    },
    {
      id: 5,
      reference: "Tanque 005",
      capteurs: ["Capteur Niveau"]
    }
  ];
  
  
  
  

const CapteurTanqueTable = () => {

  const [capteurTanques, setCapteurTanques] = useState<CapteurTanque[]>(rowsData);
  const [selectedCapteurTanque, setSelectedCapteurTanque] = useState<CapteurTanque | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);


  // console.log("users first : ", users)

  const handleDelete = (capteurTanqueId: string | number) => {
    setCapteurTanques(prevCapteurTanques => prevCapteurTanques.filter(capteurTanque => capteurTanque.id !== capteurTanqueId));
  };

  const handleEdit = (capteurTanque: CapteurTanque) => {
    setSelectedCapteurTanque(capteurTanque);
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = (updatedCapteurTanque: CapteurTanque) => {
    setCapteurTanques(prevCapteurTanques => prevCapteurTanques.map(capteurTanque => capteurTanque.id === updatedCapteurTanque.id ? updatedCapteurTanque : capteurTanque));
    setIsEditModalOpen(false);
  };

  const handleAddCapteurTanque = async (newCapteurTanque: Omit<CapteurTanque, 'id'>) => {
    try {
      console.log("newCapteurTanque : ", newCapteurTanque)
      // const createdCulture = await createCulture(newCulture);
      
      // createdCulture est une fonction à écrire qui va permettre de lancer une requête vers l'API

      // setCultures(prevCultures => [...prevCultures, createdCulture ]);
      
      // Optionnel : Afficher une notification de succès
    } catch (error) {
      console.error('Error creating Phase:', error);
      // Optionnel : Afficher une notification d'erreur
    }
  };


  

  return (
    <Card>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', m:2,  ml:4 }}>
          <Button
            variant="contained"
            color="info"
            // startIcon={<AddIcon />}
            onClick={() => setOpenAddModal(true)}
          >
            Nouveau
          </Button>
          {/* <Typography variant='h5'>User List</Typography> */}
      </Box>

      <div className={tableStyles.tableContainer}>
        <table className={tableStyles.table}>
          <thead className={tableStyles.tableHead}>
            <tr>
              <th className={tableStyles.tableHeadCell}>Référence du Tanque</th>
              <th className={tableStyles.tableHeadCell}>Capteurs</th>
              {/* <th className={tableStyles.tableHeadCell}>Superficie</th> */}
              <th className={tableStyles.tableHeadCell}>Action</th>
            </tr>
          </thead>
          <tbody className={tableStyles.tableBody}>
            {capteurTanques.map((row, index) => (
                <tr key={index} className={tableStyles.tableRow}>
                <td className={tableStyles.tableCell} data-label="Référence du Tanque">
                    <div className='flex items-center gap-3'>
                    {/* <CustomAvatar src={row.avatarSrc} size={34} /> */}
                    <div className='flex flex-col'>
                        <Typography color='text.primary' className='font-medium'>
                        {row.reference}
                        </Typography>
                        {/* <Typography variant='body2'>{row.username}</Typography> */}
                    </div>
                    </div>
                </td>
                {/* <td className={tableStyles.tableCell} data-label="Tanque">
                    <Typography>{row.Tanque}</Typography>
                </td> */}
                <td className={tableStyles.tableCell} data-label="Capteurs">
                    <div className='flex flex-col gap-1'>
                        {Array.isArray(row.capteurs) ? (
                        row.capteurs.map((capteurTanque, i) => (
                            <Typography key={i} color='text.primary'>
                            {capteurTanque}
                            </Typography>
                        ))
                        ) : (
                        <Typography color='text.primary'>{row.capteurs}</Typography>
                        )}
                    </div>
                </td>

                <td className={tableStyles.tableCell} data-label="Action">
                    <ActionButtons
                    userId={row.id}
                    onEdit={() => handleEdit(row)}
                    onDelete={(capteurTanqueId) => handleDelete(capteurTanqueId)}
                    />
                </td>
                </tr>
            ))}
            </tbody>

        </table>
      </div>

      {/* Edit User Modal */}
        {isEditModalOpen && selectedCapteurTanque && (
        <EditCapteurTanqueModal
          capteurTanque={selectedCapteurTanque}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveChanges}
        />
      )}

      <AddCapteurTanqueModal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          onAdd={handleAddCapteurTanque}
      />



    </Card>

  )
}

export default CapteurTanqueTable
