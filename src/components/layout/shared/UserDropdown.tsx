'use client'

// React Imports
import { useRef, useState, useEffect } from 'react'
import type { MouseEvent } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

// Custom Imports
import EditUserModal from './EditProfileModal'
import type { User } from '@/interfaces'

// Styled component for badge content
const BadgeContentSpan = styled('span')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'var(--mui-palette-success-main)',
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
})

const UserDropdown = () => {
  // States
  const [open, setOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null) // État pour stocker les données utilisateur

  // Refs
  const anchorRef = useRef<HTMLDivElement>(null)

  // Hooks
  const router = useRouter()

  // Fetch user data from API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // const response = await fetch('/api/user') // Remplacez par votre endpoint API
        // const userData = await response.json()
          // Simulate User Data
        const userData: User = {
          id: 1,
          name: 'John Doe',
          phone: '123-456-7890',
          password: 'password123',
          role: 'Admin',
        }

        setUser(userData)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUser()
  }, [])

  

  const handleDropdownOpen = () => {
    setOpen(!open)
  }

  const handleDropdownClose = (event?: MouseEvent<HTMLLIElement> | (MouseEvent | TouchEvent), url?: string) => {
    if (url) {
      router.push(url)
    }

    if (anchorRef.current && anchorRef.current.contains(event?.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  const handleEditProfile = () => {
    setOpen(false) // Fermer le dropdown
    setModalOpen(true) // Ouvrir le modal d'édition
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const handleModalSave = async (updatedUser: User) => {
    try {
      // // Mettre à jour l'utilisateur via l'API
      // const response = await fetch(`/api/user/${updatedUser.id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(updatedUser)
      // })

      // if (!response.ok) {
      //   throw new Error('Failed to update user')
      // }

      // const updatedUserData = await response.json()

      // // Mettre à jour l'état local avec les nouvelles données
      // setUser(updatedUserData)
      setUser(updatedUser)
      setModalOpen(false)
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Badge
        ref={anchorRef}
        overlap='circular'
        badgeContent={<BadgeContentSpan onClick={handleDropdownOpen} />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        className='mis-2'
      >
        <Avatar
          ref={anchorRef}
          alt={user.name}
          src=''  // Ajouter l'URL de l'avatar si disponible
          onClick={handleDropdownOpen}
          className='cursor-pointer bs-[38px] is-[38px]'
        />
      </Badge>
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-end'
        anchorEl={anchorRef.current}
        className='min-is-[240px] !mbs-4 z-[1]'
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top'
            }}
          >
            <Paper className='shadow-lg'>
              <ClickAwayListener onClickAway={e => handleDropdownClose(e as MouseEvent | TouchEvent)}>
                <MenuList>
                  <div className='flex items-center plb-2 pli-4 gap-2' tabIndex={-1}>
                    <Avatar alt={user.name} src='' />  {/* Ajouter l'URL de l'avatar si disponible */}
                    <div className='flex items-start flex-col'>
                      <Typography className='font-medium' color='text.primary'>
                        {user.name}
                      </Typography>
                      <Typography variant='caption'>{user.role}</Typography>
                    </div>
                  </div>
                  <Divider className='mlb-1' />
                  <MenuItem className='gap-3' onClick={handleEditProfile}>
                    <i className='ri-user-3-line' />
                    <Typography color='text.primary'>Mon Profil</Typography>
                  </MenuItem>
                  <div className='flex items-center plb-2 pli-4'>
                    <Button
                      fullWidth
                      variant='contained'
                      color='error'
                      size='small'
                      endIcon={<i className='ri-logout-box-r-line' />}
                      onClick={e => handleDropdownClose(e, '/login')}
                      sx={{ '& .MuiButton-endIcon': { marginInlineStart: 1.5 } }}
                    >
                      Logout
                    </Button>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>

      {/* Modal d'édition du profil */}
      {modalOpen && user && (
        <EditUserModal
          user={user}
          onClose={handleModalClose}
          onSave={handleModalSave}
        />
      )}
    </>
  )
}

export default UserDropdown
