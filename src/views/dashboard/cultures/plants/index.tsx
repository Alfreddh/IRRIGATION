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

import type { Culture} from '@/interfaces'
import EditCultureModal from '@/components/cultures/EditCultureModal';
import AddCultureModal from '@/components/cultures/AddCultureModal';

type TableBodyRowType = Culture

// Vars
const rowsData: TableBodyRowType[] = [
    {
      id: 1,
      culture: "Tomates",
      serre: "Serre A",
      superficie: 500
    },
    {
      id: 2,
      culture: "Concombres",
      serre: "Serre B",
      superficie: 300
    },
    {
      id: 3,
      culture: "Laitue",
      serre: "Serre A",
      superficie: 450
    },
    {
      id: 4,
      culture: "Poivrons",
      serre: "Serre C",
      superficie: 400
    },
    {
      id: 5,
      culture: "Aubergines",
      serre: "Serre D",
      superficie: 350
    },
    {
      id: 6,
      culture: "Radis",
      serre: "Serre B",
      superficie: 250
    },
    {
      id: 7,
      culture: "Épinards",
      serre: "Serre A",
      superficie: 500
    },
    {
      id: 8,
      culture: "Carottes",
      serre: "Serre C",
      superficie: 600
    },
    {
      id: 9,
      culture: "Fraises",
      serre: "Serre D",
      superficie: 320
    },
    {
      id: 10,
      culture: "Basilic",
      serre: "Serre B",
      superficie: 180
    },
    {
      id: 11,
      culture: "Persil",
      serre: "Serre C",
      superficie: 200
    },
    {
      id: 12,
      culture: "Choux",
      serre: "Serre A",
      superficie: 480
    },
    {
      id: 13,
      culture: "Haricots",
      serre: "Serre D",
      superficie: 370
    },
    {
      id: 14,
      culture: "Céleri",
      serre: "Serre B",
      superficie: 300
    },
    {
      id: 15,
      culture: "Coriandre",
      serre: "Serre C",
      superficie: 220
    }
  ]
  

const CultureTable = () => {

  const [cultures, setCultures] = useState<Culture[]>(rowsData);
  const [selectedCulture, setSelectedCulture] = useState<Culture | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);


  // console.log("users first : ", users)

  const handleDelete = (cultureId: string | number) => {
    setCultures(prevCultures => prevCultures.filter(culture => culture.id !== cultureId));
  };

  const handleEdit = (culture: Culture) => {
    setSelectedCulture(culture);
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = (updatedCulture: Culture) => {
    setCultures(prevCultures => prevCultures.map(culture => culture.id === updatedCulture.id ? updatedCulture : culture));
    setIsEditModalOpen(false);
  };

  const handleAddCulture = async (newCulture: Omit<Culture, 'id'>) => {
    try {
      console.log("newCulture : ", newCulture)
      // const createdCulture = await createCulture(newCulture);
      
      // createdCulture est une fonction à écrire qui va permettre de lancer une requête vers l'API

      // setCultures(prevCultures => [...prevCultures, createdCulture ]);
      
      // Optionnel : Afficher une notification de succès
    } catch (error) {
      console.error('Error creating Culture:', error);
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
              <th className={tableStyles.tableHeadCell}>Culture</th>
              <th className={tableStyles.tableHeadCell}>Serre</th>
              <th className={tableStyles.tableHeadCell}>Superficie</th>
              <th className={tableStyles.tableHeadCell}>Action</th>
            </tr>
          </thead>
          <tbody className={tableStyles.tableBody}>
            {cultures.map((row, index) => (
              <tr key={index} className={tableStyles.tableRow}>
                <td className={tableStyles.tableCell} data-label="Culture">
                  <div className='flex items-center gap-3'>
                    {/* <CustomAvatar src={row.avatarSrc} size={34} /> */}
                    <div className='flex flex-col'>
                      <Typography color='text.primary' className='font-medium'>
                        {row.culture}
                      </Typography>
                      {/* <Typography variant='body2'>{row.username}</Typography> */}
                    </div>
                  </div>
                </td>
                <td className={tableStyles.tableCell} data-label="Serre">
                  <Typography>{row.serre}</Typography>
                </td>
                <td className={tableStyles.tableCell} data-label="Superficie">
                  <div className='flex gap-2'>
                    {/* <i className={classnames(row.roleIcon, 'text-[22px]')} /> */}
                    <Typography color='text.primary'>{row.superficie}</Typography>
                  </div>
                </td>
                <td className={tableStyles.tableCell} data-label="Action">
                  <ActionButtons
                    userId={row.id}
                    onEdit={() => handleEdit(row)}
                    onDelete={(cultureId) => handleDelete(cultureId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Edit User Modal */}
        {isEditModalOpen && selectedCulture && (
        <EditCultureModal
          culture={selectedCulture}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveChanges}
        />
      )}

      <AddCultureModal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          onAdd={handleAddCulture}
      />



    </Card>

  )
}

export default CultureTable
