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
import type { Capteur} from '@/interfaces'
import AddCapteurModal from '@/components/capteurs/AddCapteurModal';
import EditCapteurModal from '@/components/capteurs/EditCapteurModal';

type TableBodyRowType = Capteur

// Vars
const rowsData: TableBodyRowType[] = [
    // {
    //   id: 1,
    //   capteur: "Capteur de température",
    //   type: "Thermocouple"
    // },
    // {
    //   id: 2,
    //   capteur: "Capteur de pression",
    //   type: "Manomètre"
    // },
    {
      id: 4,
      capteur: "Capteur d'humidité",
      type: "Capacitif"
    },
    {
      id: 3,
      capteur: "Capteur de niveau",
      type: "Ultrason"
    },
    {
      id: 5,
      capteur: "Pompe",
      type: "Electronique"
    },
    {
      id: 6,
      capteur: "Pedimètre",
      type: "Inductif"
    },
    // {
    //   id: 7,
    //   capteur: "Capteur de gaz",
    //   type: "Électrochimique"
    // },
    // {
    //   id: 8,
    //   capteur: "Capteur de proximité",
    //   type: "Inductif"
    // },
    // {
    //   id: 9,
    //   capteur: "Capteur de mouvement",
    //   type: "PIR (Infrarouge passif)"
    // },
    // {
    //   id: 10,
    //   capteur: "Capteur de pH",
    //   type: "Électrode de pH"
    // },
    // {
    //   id: 11,
    //   capteur: "Capteur de vibration",
    //   type: "Accéléromètre"
    // },
    // {
    //   id: 12,
    //   capteur: "Capteur de force",
    //   type: "Jauge de contrainte"
    // },
    // {
    //   id: 13,
    //   capteur: "Capteur d'oxygène",
    //   type: "Zirconium"
    // },
    // {
    //   id: 14,
    //   capteur: "Capteur de son",
    //   type: "Microphone"
    // },
    // {
    //   id: 15,
    //   capteur: "Capteur de courant",
    //   type: "Effet Hall"
    // }
  ]
  
  

const CapteurTable = () => {

  const [capteurs, setCapteurs] = useState<Capteur[]>(rowsData);
  const [selectedCapteur, setSelectedCapteur] = useState<Capteur | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);


  // console.log("users first : ", users)

  const handleDelete = (capteurId: string | number) => {
    setCapteurs(prevCapteurs => prevCapteurs.filter(capteur => capteur.id !== capteurId));
  };

  const handleEdit = (capteur: Capteur) => {
    setSelectedCapteur(capteur);
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = (updatedCapteur: Capteur) => {
    setCapteurs(prevCapteurs => prevCapteurs.map(capteur => capteur.id === updatedCapteur.id ? updatedCapteur : capteur));
    setIsEditModalOpen(false);
  };

  const handleAddCapteur = async (newCapteur: Omit<Capteur, 'id'>) => {
    try {
      console.log("newCapteur : ", newCapteur)
      // const createdCulture = await createCulture(newCulture);
      
      // createdCulture est une fonction à écrire qui va permettre de lancer une requête vers l'API

      // setCultures(prevCultures => [...prevCultures, createdCulture ]);
      
      // Optionnel : Afficher une notification de succès
    } catch (error) {
      console.error('Error creating Capteur:', error);
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
              <th className={tableStyles.tableHeadCell}>Capteur ou Actionneur</th>
              <th className={tableStyles.tableHeadCell}> Type </th>
              <th className={tableStyles.tableHeadCell}>Action</th>
            </tr>
          </thead>
          <tbody className={tableStyles.tableBody}>
            {capteurs.map((row, index) => (
              <tr key={index} className={tableStyles.tableRow}>
                <td className={tableStyles.tableCell} data-label="Capteur / Actionneur">
                  <div className='flex items-center gap-3'>
                    {/* <CustomAvatar src={row.avatarSrc} size={34} /> */}
                    <div className='flex flex-col'>
                      <Typography color='text.primary' className='font-medium'>
                        {row.capteur}
                      </Typography>
                      {/* <Typography variant='body2'>{row.username}</Typography> */}
                    </div>
                  </div>
                </td>
                {/* <td className={tableStyles.tableCell} data-label="Téléphone">
                  <Typography>{row.serre}</Typography>
                </td> */}
                <td className={tableStyles.tableCell} data-label="Type">
                  <div className='flex gap-2'>
                    {/* <i className={classnames(row.roleIcon, 'text-[22px]')} /> */}
                    <Typography color='text.primary'>{row.type}</Typography>
                  </div>
                </td>
                <td className={tableStyles.tableCell} data-label="Action">
                  <ActionButtons
                    userId={row.id}
                    onEdit={() => handleEdit(row)}
                    onDelete={(capteurId) => handleDelete(capteurId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Edit User Modal */}
        {isEditModalOpen && selectedCapteur && (
        <EditCapteurModal
          capteur={selectedCapteur}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveChanges}
        />
      )}

      <AddCapteurModal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          onAdd={handleAddCapteur}
      />



    </Card>

  )
}

export default CapteurTable
