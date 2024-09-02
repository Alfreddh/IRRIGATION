'use client'

import { Fertilizer } from "@/interfaces";
// MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import {Button, Box} from '@mui/material';


// Styles Imports
import tableStyles from '@/core/styles/table.module.css'
import { useState } from 'react'

import { ActionButtons } from '@/components/ActionButtons';

import AddFertilizerModal from "@/components/cultures/fertilisants/AddCultureFertilizerModal";
import EditFertilizerModal from "@/components/cultures/fertilisants/EditCultureFertilizerModal";

const fertilizerData: Fertilizer[] = [
    {
      id: 1,
      fertilisant: "Nitrate d'Ammonium",
      quantite: 50,
      culture: "Tomates",
      phase_application_engrais: "Préparation du sol"
    },
    {
      id: 2,
      fertilisant: "Urée",
      quantite: 30,
      culture: "Maïs",
      phase_application_engrais: "Croissance"
    },
    {
      id: 3,
      fertilisant: "Phosphate de Potassium",
      quantite: 40,
      culture: "Pommes de terre",
      phase_application_engrais: "Désherbage"
    },
    {
      id: 4,
      fertilisant: "Sulfate de Magnésium",
      quantite: 25,
      culture: "Carottes",
      phase_application_engrais: "Semis"
    },
    {
      id: 5,
      fertilisant: "Engrais organique",
      quantite: 60,
      culture: "Salades",
      phase_application_engrais: "Récolte"
    }
  ];
  
const FertilizerTable = () => {

  const [fertilizers, setFertilizers] = useState<Fertilizer[]>(fertilizerData);
  const [selectedFertilizer, setSelectedFertilizer] = useState<Fertilizer | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);


  // console.log("users first : ", users)

  const handleDelete = (fertilizerId: string | number) => {
    setFertilizers(prevFertilizers => prevFertilizers.filter(fertilizer => fertilizer.id !== fertilizerId));
  };

  const handleEdit = (fertilizer: Fertilizer) => {
    setSelectedFertilizer(fertilizer);
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = (updatedFertilizer: Fertilizer) => {
    setFertilizers(prevFertilizers => prevFertilizers.map(fertilizer => fertilizer.id === updatedFertilizer.id ? updatedFertilizer : fertilizer));
    setIsEditModalOpen(false);
  };

  const handleAddFertilizer = async (newFertilizer: Omit<Fertilizer, 'id'>) => {
    try {
      console.log("newFertilizer : ", newFertilizer)
      // const createdFertilizer = await createFertilizer(newFertilizer);
      
      // createdFertilizer est une fonction à écrire qui va permettre de lancer une requête vers l'API

      // setFertilizers(prevFertilizers => [...prevFertilizers, createdFertilizer ]);
      
      // Optionnel : Afficher une notification de succès
    } catch (error) {
      console.error('Error creating Fertilizer:', error);
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
              <th className={tableStyles.tableHeadCell}>Fertilisant</th>
              <th className={tableStyles.tableHeadCell}>Culture</th>
              <th className={tableStyles.tableHeadCell}>Quantité</th>
              <th className={tableStyles.tableHeadCell}>Phase de la culture</th>
              <th className={tableStyles.tableHeadCell}>Action</th>
            </tr>
          </thead>
          <tbody className={tableStyles.tableBody}>
            {fertilizers.map((row, index) => (
              <tr key={index} className={tableStyles.tableRow}>
                <td className={tableStyles.tableCell} data-label="Fertilisant">
                  <div className='flex items-center gap-3'>
                    {/* <CustomAvatar src={row.avatarSrc} size={34} /> */}
                    <div className='flex flex-col'>
                      <Typography color='text.primary' className='font-medium'>
                        {row.fertilisant}
                      </Typography>
                      {/* <Typography variant='body2'>{row.username}</Typography> */}
                    </div>
                  </div>
                </td>
                <td className={tableStyles.tableCell} data-label="Culture">
                  <Typography>{row.culture}</Typography>
                </td>
                <td className={tableStyles.tableCell} data-label="Quantité">
                  <div className='flex gap-2'>
                    {/* <i className={classnames(row.roleIcon, 'text-[22px]')} /> */}
                    <Typography color='text.primary'>{row.quantite}</Typography>
                  </div>
                </td>
                <td className={tableStyles.tableCell} data-label="Phase d'application d'engrais">
                  <Typography>{row.phase_application_engrais}</Typography>
                </td>
                <td className={tableStyles.tableCell} data-label="Action">
                  <ActionButtons
                    userId={row.id}
                    onEdit={() => handleEdit(row)}
                    onDelete={(fertilizerId) => handleDelete(fertilizerId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Edit User Modal */}
        {isEditModalOpen && selectedFertilizer && (
        <EditFertilizerModal
          fertilizer={selectedFertilizer}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveChanges}
        />
      )}

      <AddFertilizerModal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          onAdd={handleAddFertilizer}
      />



    </Card>

  )
}

export default FertilizerTable
