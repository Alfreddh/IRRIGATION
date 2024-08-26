'use client'

// MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'

// Third-party Imports
import classnames from 'classnames'

// Components Imports
import CustomAvatar from '@/core/components/mui/Avatar'

// Styles Imports
import tableStyles from '@/core/styles/table.module.css'
import { useState } from 'react'

import { ActionButtons } from './ActionButtons'

import type { User } from '@/interfaces'
import EditUserModal from './EditUserModal'


type TableBodyRowType = User

// Vars
const rowsData: TableBodyRowType[] = [
  {
    id: 1,
    avatarSrc: '/images/avatars/1.png',
    name: 'Jordan Stevenson',
    username: '@amiccoo',
    email: 'Jacinthe_Blick@hotmail.com',
    iconClass: 'text-primary',
    roleIcon: 'ri-vip-crown-line',
    role: 'Admin',
    status: 'pending'
  },
  {
    id: 2,
    avatarSrc: '/images/avatars/2.png',
    name: 'Richard Payne',
    username: '@brossiter15',
    email: 'Jaylon_Bartell3@gmail.com',
    iconClass: 'text-warning',
    roleIcon: 'ri-edit-box-line',
    role: 'Editor',
    status: 'active'
  },
  {
    id: 3,
    avatarSrc: '/images/avatars/3.png',
    name: 'Jennifer Summers',
    username: '@jsbemblinf',
    email: 'Tristin_Johnson@gmail.com',
    iconClass: 'text-error',
    roleIcon: 'ri-computer-line',
    role: 'Author',
    status: 'active'
  },
  {
    id: 4,
    avatarSrc: '/images/avatars/4.png',
    name: 'Mr. Justin Richardson',
    username: '@justin45',
    email: 'Toney21@yahoo.com',
    iconClass: 'text-warning',
    roleIcon: 'ri-edit-box-line',
    role: 'Editor',
    status: 'pending'
  },
  {
    id: 5,
    avatarSrc: '/images/avatars/5.png',
    name: 'Nicholas Tanner',
    username: '@tannernic',
    email: 'Hunter_Kuhic68@hotmail.com',
    iconClass: 'text-info',
    roleIcon: 'ri-pie-chart-2-line',
    role: 'Maintainer',
    status: 'active'
  },
  {
    id: 6,
    avatarSrc: '/images/avatars/6.png',
    name: 'Crystal Mays',
    username: '@crystal99',
    email: 'Norene_Bins@yahoo.com',
    iconClass: 'text-warning',
    roleIcon: 'ri-edit-box-line',
    role: 'Editor',
    status: 'pending'
  },
  {
    id: 7,
    avatarSrc: '/images/avatars/7.png',
    name: 'Mary Garcia',
    username: '@marygarcia4',
    email: 'Emmitt.Walker14@hotmail.com',
    iconClass: 'text-info',
    roleIcon: 'ri-pie-chart-2-line',
    role: 'Maintainer',
    status: 'inactive'
  },
  {
    id: 8,
    avatarSrc: '/images/avatars/8.png',
    name: 'Megan Roberts',
    username: '@megan78',
    email: 'Patrick.Howe73@gmail.com',
    iconClass: 'text-success',
    roleIcon: 'ri-user-3-line',
    role: 'Subscriber',
    status: 'active'
  },
  {
    id: 9,
    avatarSrc: '/images/avatars/4.png',
    name: 'Mr. Justin Richardson',
    username: '@justin45',
    email: 'Toney21@yahoo.com',
    iconClass: 'text-warning',
    roleIcon: 'ri-edit-box-line',
    role: 'Editor',
    status: 'pending'
  },
  {
    id: 10,
    avatarSrc: '/images/avatars/5.png',
    name: 'Nicholas Tanner',
    username: '@tannernic',
    email: 'Hunter_Kuhic68@hotmail.com',
    iconClass: 'text-info',
    roleIcon: 'ri-pie-chart-2-line',
    role: 'Maintainer',
    status: 'active'
  },
  {
    id: 11,
    avatarSrc: '/images/avatars/6.png',
    name: 'Crystal Mays',
    username: '@crystal99',
    email: 'Norene_Bins@yahoo.com',
    iconClass: 'text-warning',
    roleIcon: 'ri-edit-box-line',
    role: 'Editor',
    status: 'pending'
  },
  {
    id: 12,
    avatarSrc: '/images/avatars/7.png',
    name: 'Mary Garcia',
    username: '@marygarcia4',
    email: 'Emmitt.Walker14@hotmail.com',
    iconClass: 'text-info',
    roleIcon: 'ri-pie-chart-2-line',
    role: 'Maintainer',
    status: 'inactive'
  },
  {
    id: 13,
    avatarSrc: '/images/avatars/8.png',
    name: 'Megan Roberts',
    username: '@megan78',
    email: 'Patrick.Howe73@gmail.com',
    iconClass: 'text-success',
    roleIcon: 'ri-user-3-line',
    role: 'Subscriber',
    status: 'active'
  },
  {
    id: 14,
    avatarSrc: '/images/avatars/1.png',
    name: 'Jordan Stevenson',
    username: '@amiccoo',
    email: 'Jacinthe_Blick@hotmail.com',
    iconClass: 'text-primary',
    roleIcon: 'ri-vip-crown-line',
    role: 'Admin',
    status: 'pending'
  },
  {
    id: 15,
    avatarSrc: '/images/avatars/2.png',
    name: 'Richard Payne',
    username: '@brossiter15',
    email: 'Jaylon_Bartell3@gmail.com',
    iconClass: 'text-warning',
    roleIcon: 'ri-edit-box-line',
    role: 'Editor',
    status: 'active'
  },
  {
    id: 16,
    avatarSrc: '/images/avatars/3.png',
    name: 'Jennifer Summers',
    username: '@jsbemblinf',
    email: 'Tristin_Johnson@gmail.com',
    iconClass: 'text-error',
    roleIcon: 'ri-computer-line',
    role: 'Author',
    status: 'active'
  },

]

const Table = () => {

  const [users, setUsers] = useState<User[]>(rowsData);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // console.log("users first : ", users)

  const handleDelete = (userId: string | number) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = (updatedUser: User) => {
    setUsers(prevUsers => prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
    setIsEditModalOpen(false);
  };

  

  return (
    <Card>
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
                    <CustomAvatar src={row.avatarSrc} size={34} />
                    <div className='flex flex-col'>
                      <Typography color='text.primary' className='font-medium'>
                        {row.name}
                      </Typography>
                      <Typography variant='body2'>{row.username}</Typography>
                    </div>
                  </div>
                </td>
                <td className={tableStyles.tableCell} data-label="Téléphone">
                  <Typography>{row.email}</Typography>
                </td>
                <td className={tableStyles.tableCell} data-label="Role">
                  <div className='flex gap-2'>
                    <i className={classnames(row.roleIcon, row.iconClass, 'text-[22px]')} />
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

    </Card>

  )
}

export default Table
