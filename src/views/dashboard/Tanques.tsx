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

import { ActionButtons } from '../../components/ActionButtons'

import type { Tanque} from '@/interfaces'
import AddTanqueModal from '@/components/tanques/AddTanqueModal';
import EditTanqueModal from '@/components/tanques/EditTanqueModal';

type TableBodyRowType = Tanque

// Vars
const rowsData: TableBodyRowType[] = [
    {
      id: 1,
      type: "Réservoir d'eau",
      capacity: 1000
    },
    {
      id: 2,
      type: "Réservoir de carburant",
      capacity: 5000
    },
    {
      id: 3,
      type: "Citerne à lait",
      capacity: 2000
    },
    {
      id: 4,
      type: "Réservoir d'huile",
      capacity: 1500
    },
    {
      id: 5,
      type: "Réservoir chimique",
      capacity: 3000
    },
    {
      id: 6,
      type: "Réservoir d'acide",
      capacity: 2500
    },
    {
      id: 7,
      type: "Réservoir à gaz",
      capacity: 6000
    },
    {
      id: 8,
      type: "Réservoir d'eau potable",
      capacity: 1200
    },
    {
      id: 9,
      type: "Citerne à vin",
      capacity: 1800
    },
    {
      id: 10,
      type: "Réservoir à engrais liquide",
      capacity: 2200
    },
    {
      id: 11,
      type: "Réservoir de collecte de pluie",
      capacity: 800
    },
    {
      id: 12,
      type: "Réservoir de traitement des eaux usées",
      capacity: 4000
    },
    {
      id: 13,
      type: "Réservoir d'oxygène liquide",
      capacity: 7000
    },
    {
      id: 14,
      type: "Citerne de stockage de sirop",
      capacity: 2700
    },
    {
      id: 15,
      type: "Réservoir de biogaz",
      capacity: 5000
    }
  ]
  
  

const TanqueTable = () => {

  const [tanques, setTanques] = useState<Tanque[]>(rowsData);
  const [selectedTanque, setSelectedTanque] = useState<Tanque | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);


  // console.log("users first : ", users)

  const handleDelete = (tanqueId: string | number) => {
    setTanques(prevTanques => prevTanques.filter(tanque => tanque.id !== tanqueId));
  };

  const handleEdit = (tanque: Tanque) => {
    setSelectedTanque(tanque);
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = (updatedTanque: Tanque) => {
    setTanques(prevTanques => prevTanques.map(tanque => tanque.id === updatedTanque.id ? updatedTanque : tanque));
    setIsEditModalOpen(false);
  };

  const handleAddTanque = async (newTanque: Omit<Tanque, 'id'>) => {
    try {
      console.log("newTanque : ", newTanque)
      // const createdCulture = await createCulture(newCulture);
      
      // createdCulture est une fonction à écrire qui va permettre de lancer une requête vers l'API

      // setCultures(prevCultures => [...prevCultures, createdCulture ]);
      
      // Optionnel : Afficher une notification de succès
    } catch (error) {
      console.error('Error creating Tanque:', error);
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
              <th className={tableStyles.tableHeadCell}>Type de Tanque</th>
              <th className={tableStyles.tableHeadCell}>Capacité en Litres </th>
              <th className={tableStyles.tableHeadCell}>Action</th>
            </tr>
          </thead>
          <tbody className={tableStyles.tableBody}>
            {tanques.map((row, index) => (
              <tr key={index} className={tableStyles.tableRow}>
                <td className={tableStyles.tableCell} data-label="Utilisateur">
                  <div className='flex items-center gap-3'>
                    {/* <CustomAvatar src={row.avatarSrc} size={34} /> */}
                    <div className='flex flex-col'>
                      <Typography color='text.primary' className='font-medium'>
                        {row.type}
                      </Typography>
                      {/* <Typography variant='body2'>{row.username}</Typography> */}
                    </div>
                  </div>
                </td>
                {/* <td className={tableStyles.tableCell} data-label="Téléphone">
                  <Typography>{row.serre}</Typography>
                </td> */}
                <td className={tableStyles.tableCell} data-label="Role">
                  <div className='flex gap-2'>
                    {/* <i className={classnames(row.roleIcon, 'text-[22px]')} /> */}
                    <Typography color='text.primary'>{row.capacity}</Typography>
                  </div>
                </td>
                <td className={tableStyles.tableCell} data-label="Action">
                  <ActionButtons
                    userId={row.id}
                    onEdit={() => handleEdit(row)}
                    onDelete={(tanqueId) => handleDelete(tanqueId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Edit User Modal */}
        {isEditModalOpen && selectedTanque && (
        <EditTanqueModal
          tanque={selectedTanque}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveChanges}
        />
      )}

      <AddTanqueModal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          onAdd={handleAddTanque}
      />



    </Card>

  )
}

export default TanqueTable
