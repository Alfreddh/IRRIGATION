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

import type { CapteurSerre } from '@/interfaces'

import AddCapteurSerreModal from '@/components/capteurs/serre-tanque/AddCapteurSerreModal';
import EditCapteurSerreModal from '@/components/capteurs/serre-tanque/EditCapteurSerreModal';

type TableBodyRowType = CapteurSerre

// Vars
const rowsData: TableBodyRowType[] = [
    {
      id: 1,
      reference: "Tanque 001",
      capteurs: ["Capteur Température", "Capteur Humidité"]
    },
    {
      id: 2,
      reference: "Tanque 002",
      capteurs: ["Capteur Lumière", "Capteur CO2"]
    },
    {
      id: 3,
      reference: "Tanque 003",
      capteurs: ["Capteur pH", "Capteur Nutriments", "Capteur Humidité"]
    },
    {
      id: 4,
      reference: "Tanque 004",
      capteurs: ["Capteur Température", "Capteur CO2"]
    },
    {
      id: 5,
      reference: "Tanque 005",
      capteurs: ["Capteur Lumière", "Capteur Humidité", "Capteur Nutriments"]
    }
  ];
  
  
  
  

const CapteurTanqueTable = () => {

  const [capteurSerres, setCapteurSerres] = useState<CapteurSerre[]>(rowsData);
  const [selectedCapteurSerre, setSelectedCapteurSerre] = useState<CapteurSerre | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);


  // console.log("users first : ", users)

  const handleDelete = (capteurSerreId: string | number) => {
    setCapteurSerres(prevCapteurSerres => prevCapteurSerres.filter(capteurSerre => capteurSerre.id !== capteurSerreId));
  };

  const handleEdit = (capteurSerre: CapteurSerre) => {
    setSelectedCapteurSerre(capteurSerre);
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = (updatedCapteurSerre: CapteurSerre) => {
    setCapteurSerres(prevCapteurSerres => prevCapteurSerres.map(capteurSerre => capteurSerre.id === updatedCapteurSerre.id ? updatedCapteurSerre : capteurSerre));
    setIsEditModalOpen(false);
  };

  const handleAddCapteurSerre = async (newCapteurSerre: Omit<CapteurSerre, 'id'>) => {
    try {
      console.log("newCapteurTanque : ", newCapteurSerre)
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
            {capteurSerres.map((row, index) => (
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
                {/* <td className={tableStyles.tableCell} data-label="Serre">
                    <Typography>{row.serre}</Typography>
                </td> */}
                <td className={tableStyles.tableCell} data-label="Capteurs">
                    <div className='flex flex-col gap-1'>
                        {Array.isArray(row.capteurs) ? (
                        row.capteurs.map((capteurSerre, i) => (
                            <Typography key={i} color='text.primary'>
                            {capteurSerre}
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
                    onDelete={(capteurSerreId) => handleDelete(capteurSerreId)}
                    />
                </td>
                </tr>
            ))}
            </tbody>

        </table>
      </div>

      {/* Edit User Modal */}
        {isEditModalOpen && selectedCapteurSerre && (
        <EditCapteurSerreModal
          capteurSerre={selectedCapteurSerre}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveChanges}
        />
      )}

      <AddCapteurSerreModal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          onAdd={handleAddCapteurSerre}
      />



    </Card>

  )
}

export default CapteurTanqueTable
