'use client'

// React Imports
import { useState, ChangeEvent, useEffect } from 'react'


// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
// import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import Divider from '@mui/material/Divider'

// Type Imports
import type { Mode } from '@/core/types'

// Component Imports
// import Illustrations from '@/components/Illustrations'
import Form from '@/components/Form'
import Logo from '@/components/layout/shared/Logo'

// Hook Imports
// import { useImageVariant } from '@/core/hooks/useImageVariant'
import { validateForm } from './Validations/register'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

const Register = ({ mode }: { mode: Mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isPasswordRepeatShown, setIsRepeatPasswordShown] = useState(false)

  // Etats pour gérer les valeurs des champs du formulaire
  const [formData, setformData] = useState({
    phone: '',
    name: '',
    password: '',
    repeatPassword: '',
    role: 'Admin'
  });


  const [errors, setErrors] = useState({
    phone: '',
    password: '',
    repeatPassword: '',
    name: ''
  });


  // // Vars
  // const darkImg = '/images/pages/auth-v1-mask-dark.png'
  // const lightImg = '/images/pages/auth-v1-mask-light.png'

  // Hooks
  const router = useRouter()
  // const authBackground = useImageVariant(mode, lightImg, darkImg)

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleClickShowRepeatPassword = () => setIsRepeatPasswordShown(show => !show)

  useEffect(() => {
    if (formData.password && formData.repeatPassword) {
      const formErrors = validateForm(formData);
      setErrors(prevErrors => ({
        ...prevErrors,
        repeatPassword: formErrors.repeatPassword || ''
      }));
    }
  }, [formData.password, formData.repeatPassword]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;

    setformData(prevData => ({
      ...prevData,
      [name]: value
    }));

    const fieldErrors = validateForm({ ...formData, [name]: value });
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: fieldErrors[name] || ''
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formErrors = validateForm(formData);
    console.log("Form errors:", formErrors);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Créez un nouvel objet sans repeatPassword
    const { repeatPassword, ...dataToSend } = formData;

    console.log("data : ", dataToSend)
    
    try {
      const response = await fetch('https://votre-api-externe.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })

      if (response.ok) {
        // Redirection vers la page de connexion ou le tableau de bord
        router.push('/login')
      } else {
        // Gérer les erreurs de l'API
        const errorData = await response.json()
        alert(`Erreur lors de l'inscription : ${errorData.message}`)
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error)
      alert("Une erreur est survenue lors de l'inscription. Veuillez réessayer.")
    }
  }


  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='p-6 sm:!p-12'>
          <Link href='/' className='flex justify-center items-start mbe-6'>
            <Logo />
          </Link>
          {/* <Typography variant='h4'>L'aventure commence ici 🚀</Typography> */}
          <div className='flex flex-col gap-5'>
            <Typography className='mbs-1'>Créer votre compte et gardez un oeil sur tout votre système d'irrigation 🚀 !</Typography>

            <Form autoComplete='off' className='flex flex-col gap-5' onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label='Nom'
                name='name'
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <i className='ri-user-3-line' />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                fullWidth
                label='Phone No.'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <i className='ri-phone-fill' />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                fullWidth
                label='Password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                type={isPasswordShown ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (               
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={isPasswordShown ? 'ri-eye-line' : 'ri-eye-off-line'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                fullWidth
                label='Repeat Password'
                name='repeatPassword'
                value={formData.repeatPassword}
                onChange={handleChange}
                error={!!errors.repeatPassword}
                helperText={errors.repeatPassword}
                type={isPasswordRepeatShown ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        edge='end'
                        onClick={handleClickShowRepeatPassword}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={isPasswordRepeatShown ? 'ri-eye-line' : 'ri-eye-off-line'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  label='Role'
                  name='role'
                  value={formData.role}
                  onChange={handleChange}
                >
                  <MenuItem value={"User"}>User</MenuItem>
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                </Select>
              </FormControl>
              
              <Button fullWidth variant='contained' type='submit'>
                Sign Up
              </Button>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>Avez-vous déjà un compte ? </Typography>
                <Typography component={Link} href='/login' color='primary'>
                  Connectez-vous !
                </Typography>
              </div>
             
            </Form>
          </div>
        </CardContent>
      </Card>
      {/* <Illustrations maskImg={{ src: authBackground }} /> */}
    </div>
  )
}

export default Register
