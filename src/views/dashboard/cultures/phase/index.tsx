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

import type { Phase } from '@/interfaces'

import AddPhaseModal from '@/components/cultures/phases/AddCulturePhasesModal';
import EditPhaseModal from '@/components/cultures/phases/EditCulturePhasesModal';


type TableBodyRowType = Phase

// Vars
const rowsData: TableBodyRowType[] = [
    {
      id: 1,
      culture: "Tomates",
      phases: ["Germination"],
      startPeriod: new Date("2024-03-01"),
      endPeriod: new Date("2024-07-15")
    },
    {
      id: 3,
      culture: "Poivrons",
      phases: ["Récolte"],
      startPeriod: new Date("2024-02-15"),
      endPeriod: new Date("2024-06-01")
    },
    {
      id: 4,
      culture: "Poivrons",
      phases: ["Plantule"],
      startPeriod: new Date("2024-04-01"),
      endPeriod: new Date("2024-09-10")
    },

    {
      id: 2,
      culture: "Tomates",
      phases: ["Fructification"],
      startPeriod: new Date("2024-04-10"),
      endPeriod: new Date("2024-08-20")
    },
    // {
    //   id: 5,
    //   culture: "Aubergines",
    //   phases: ["Préparation du sol", "Semis", "Entretien", "Récolte"],
    //   startPeriod: new Date("2024-03-20"),
    //   endPeriod: new Date("2024-08-05")
    // },
    {
      id: 6,
      culture: "Poivrons",
      phases: ["Récolte"],
      startPeriod: new Date("2024-01-10"),
      endPeriod: new Date("2024-04-25")
    },
    // {
    //   id: 7,
    //   culture: "Épinards",
    //   phases: ["Préparation du sol", "Semis", "Irrigation", "Récolte"],
    //   startPeriod: new Date("2024-03-05"),
    //   endPeriod: new Date("2024-07-30")
    // },
    // {
    //   id: 8,
    //   culture: "Carottes",
    //   phases: ["Préparation du sol", "Semis", "Désherbage", "Récolte"],
    //   startPeriod: new Date("2024-02-25"),
    //   endPeriod: new Date("2024-07-10")
    // },
    // {
    //   id: 9,
    //   culture: "Fraises",
    //   phases: ["Préparation du sol", "Plantation", "Croissance", "Récolte"],
    //   startPeriod: new Date("2024-04-15"),
    //   endPeriod: new Date("2024-09-01")
    // },
    // {
    //   id: 10,
    //   culture: "Basilic",
    //   phases: ["Semis", "Irrigation", "Croissance", "Récolte"],
    //   startPeriod: new Date("2024-05-01"),
    //   endPeriod: new Date("2024-09-15")
    // },
    // {
    //   id: 11,
    //   culture: "Persil",
    //   phases: ["Semis", "Arrosage", "Entretien", "Récolte"],
    //   startPeriod: new Date("2024-02-20"),
    //   endPeriod: new Date("2024-06-15")
    // },
    // {
    //   id: 12,
    //   culture: "Choux",
    //   phases: ["Préparation du sol", "Plantation", "Croissance", "Récolte"],
    //   startPeriod: new Date("2024-03-10"),
    //   endPeriod: new Date("2024-08-25")
    // },
    // {
    //   id: 13,
    //   culture: "Haricots",
    //   phases: ["Préparation du sol", "Semis", "Désherbage", "Récolte"],
    //   startPeriod: new Date("2024-04-05"),
    //   endPeriod: new Date("2024-08-20")
    // },
    // {
    //   id: 14,
    //   culture: "Céleri",
    //   phases: ["Semis", "Irrigation", "Entretien", "Récolte"],
    //   startPeriod: new Date("2024-03-01"),
    //   endPeriod: new Date("2024-07-15")
    // },
    // {
    //   id: 15,
    //   culture: "Coriandre",
    //   phases: ["Préparation du sol", "Semis", "Croissance", "Récolte"],
    //   startPeriod: new Date("2024-02-10"),
    //   endPeriod: new Date("2024-05-30")
    // }
  ]
  
  
  
  

const PhaseTable = () => {

  const [phases, setPhases] = useState<Phase[]>(rowsData);
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);


  // console.log("users first : ", users)

  const handleDelete = (phaseId: string | number) => {
    setPhases(prevPhases => prevPhases.filter(phase => phase.id !== phaseId));
  };

  const handleEdit = (phase: Phase) => {
    setSelectedPhase(phase);
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = (updatedPhase: Phase) => {
    setPhases(prevPhases => prevPhases.map(phase => phase.id === updatedPhase.id ? updatedPhase : phase));
    setIsEditModalOpen(false);
  };

  const handleAddPhase = async (newPhase: Omit<Phase, 'id'>) => {
    try {
      console.log("newPhase : ", newPhase)
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
            // color="info"
            color="primary"

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
              <th className={tableStyles.tableHeadCell}>Phases de la culture</th>
              {/* <th className={tableStyles.tableHeadCell}>Superficie</th> */}
              <th className={tableStyles.tableHeadCell}>Action</th>
            </tr>
          </thead>
          <tbody className={tableStyles.tableBody}>
            {phases.map((row, index) => (
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
                {/* <td className={tableStyles.tableCell} data-label="Serre">
                    <Typography>{row.serre}</Typography>
                </td> */}
                <td className={tableStyles.tableCell} data-label="Phases de la culture">
                    <div className='flex flex-col gap-1'>
                        {Array.isArray(row.phases) ? (
                        row.phases.map((phase, i) => (
                            <Typography key={i} color='text.primary'>
                            {phase}
                            </Typography>
                        ))
                        ) : (
                        <Typography color='text.primary'>{row.phases}</Typography>
                        )}
                    </div>
                </td>

                <td className={tableStyles.tableCell} data-label="Action">
                    <ActionButtons
                    userId={row.id}
                    onEdit={() => handleEdit(row)}
                    onDelete={(phaseId) => handleDelete(phaseId)}
                    />
                </td>
                </tr>
            ))}
            </tbody>

        </table>
      </div>

      {/* Edit User Modal */}
        {isEditModalOpen && selectedPhase && (
        <EditPhaseModal
          phase={selectedPhase}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveChanges}
        />
      )}

      <AddPhaseModal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          onAdd={handleAddPhase}
      />



    </Card>

  )
}

export default PhaseTable
