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

import type { User } from '@/interfaces'
import EditUserModal from '../../components/users/EditUserModal'
import AddUserModal from '../../components/users/AddUserModal';


type TableBodyRowType = User

// Vars
const rowsData: TableBodyRowType[] = [
  {
    id: 1,
    // avatarSrc: '/images/avatars/1.png',
    name: 'Jordan Stevenson',
    phone: 'Jacinthe_Blick@hotmail.com',
    role: 'Admin',
    password: 'yanel'
  },
  {
    id: 2,
    name: 'Richard Payne',
    phone: 'Jaylon_Bartell3@gmail.com',
    role: 'User',
    password: 'yanel'
  },
  {
    id: 1,
    // avatarSrc: '/images/avatars/1.png',
    name: 'Jordan Stevenson',
    phone: 'Jacinthe_Blick@hotmail.com',
    role: 'Admin',
    password: 'yanel'
  },
  {
    id: 2,
    name: 'Richard Payne',
    phone: 'Jaylon_Bartell3@gmail.com',
    role: 'User',
    password: 'yanel'
  },
  {
    id: 1,
    // avatarSrc: '/images/avatars/1.png',
    name: 'Jordan Stevenson',
    phone: 'Jacinthe_Blick@hotmail.com',
    role: 'Admin',
    password: 'yanel'
  },
  {
    id: 2,
    name: 'Richard Payne',
    phone: 'Jaylon_Bartell3@gmail.com',
    role: 'User',
    password: 'yanel'
  },
  {
    id: 1,
    // avatarSrc: '/images/avatars/1.png',
    name: 'Jordan Stevenson',
    phone: 'Jacinthe_Blick@hotmail.com',
    role: 'Admin',
    password: 'yanel'
  },
  {
    id: 2,
    name: 'Richard Payne',
    phone: 'Jaylon_Bartell3@gmail.com',
    role: 'User',
    password: 'yanel'
  },
  {
    id: 1,
    // avatarSrc: '/images/avatars/1.png',
    name: 'Jordan Stevenson',
    phone: 'Jacinthe_Blick@hotmail.com',
    role: 'Admin',
    password: 'yanel'
  },
  {
    id: 2,
    name: 'Richard Payne',
    phone: 'Jaylon_Bartell3@gmail.com',
    role: 'User',
    password: 'yanel'
  },
  {
    id: 1,
    // avatarSrc: '/images/avatars/1.png',
    name: 'Jordan Stevenson',
    phone: 'Jacinthe_Blick@hotmail.com',
    role: 'Admin',
    password: 'yanel'
  },
  {
    id: 2,
    name: 'Richard Payne',
    phone: 'Jaylon_Bartell3@gmail.com',
    role: 'User',
    password: 'yanel'
  },
  {
    id: 1,
    // avatarSrc: '/images/avatars/1.png',
    name: 'Jordan Stevenson',
    phone: 'Jacinthe_Blick@hotmail.com',
    role: 'Admin',
    password: 'yanel'
  },
  {
    id: 2,
    name: 'Richard Payne',
    phone: 'Jaylon_Bartell3@gmail.com',
    role: 'User',
    password: 'yanel'
  },

]

const UserTable = () => {

  const [users, setUsers] = useState<User[]>(rowsData);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);


  // console.log("users first : ", users)

  const handleDelete = (userId: string | number) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = (updatedUser: User) => {
    console.log("updateduser : ", updatedUser)
    setUsers(prevUsers => prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
    setIsEditModalOpen(false);
  };

  const handleAddUser = async (newUser: Omit<User, 'id'>) => {
    try {
      console.log("newUseer : ", newUser)
      // const createdUser = await createUser(newUser);
      
      // createdUser est une fonction à écrire qui va permettre de lancer une requête vers l'API

      // setUsers(prevUsers => [...prevUsers, createdUser ]);
      
      // Optionnel : Afficher une notification de succès
    } catch (error) {
      console.error('Error creating user:', error);
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
              <th className={tableStyles.tableHeadCell}>Utilisateur</th>
              <th className={tableStyles.tableHeadCell}>Téléphone</th>
              <th className={tableStyles.tableHeadCell}>Role</th>
              <th className={tableStyles.tableHeadCell}>Action</th>
            </tr>
          </thead>
          <tbody className={tableStyles.tableBody}>
            {users.map((row, index) => (
              <tr key={index} className={tableStyles.tableRow}>
                <td className={tableStyles.tableCell} data-label="Utilisateur">
                  <div className='flex items-center gap-3'>
                    {/* <CustomAvatar src={row.avatarSrc} size={34} /> */}
                    <div className='flex flex-col'>
                      <Typography color='text.primary' className='font-medium'>
                        {row.name}
                      </Typography>
                      {/* <Typography variant='body2'>{row.username}</Typography> */}
                    </div>
                  </div>
                </td>
                <td className={tableStyles.tableCell} data-label="Téléphone">
                  <Typography>{row.phone}</Typography>
                </td>
                <td className={tableStyles.tableCell} data-label="Role">
                  <div className='flex gap-2'>
                    {/* <i className={classnames(row.roleIcon, 'text-[22px]')} /> */}
                    <Typography color='text.primary'>{row.role}</Typography>
                  </div>
                </td>
                <td className={tableStyles.tableCell} data-label="Action">
                  <ActionButtons
                    userId={row.id}
                    onEdit={() => handleEdit(row)}
                    onDelete={(userId) => handleDelete(userId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Edit User Modal */}
        {isEditModalOpen && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveChanges}
        />
      )}

      <AddUserModal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          onAdd={handleAddUser}
      />



    </Card>

  )
}

export default UserTable
