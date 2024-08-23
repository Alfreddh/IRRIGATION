'use client'

// React Imports
import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

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
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

// Type Imports
import type { Mode } from '@/core/types'

// Component Imports
import Logo from '@/components/layout/shared/Logo'
// import Illustrations from '@/components/Illustrations'
import Form from '@/components/Form'


// Config Imports
import themeConfig from '@/configs/themeConfig'
import { validateForm } from './Validations/login'

// Hook Imports
// import { useImageVariant } from '@/core/hooks/useImageVariant'

const Login = ({ mode }: { mode: Mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)

    // Etats pour gérer les valeurs des champs du formulaire
    const [formData, setformData] = useState({
      phone: '',
      password: '',
    });
  
  
    const [errors, setErrors] = useState({
      phone: '',
      password: '',
    });

  // // Vars
  // const darkImg = '/images/pages/auth-v1-mask-dark.png'
  // const lightImg = '/images/pages/auth-v1-mask-light.png'

  // Hooks
  const router = useRouter()
  // const authBackground = useImageVariant(mode, lightImg, darkImg)

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setformData({
      ...formData,
      [name]: value
    });

    // Valider le champ spécifique
    const fieldErrors = validateForm({ [name]: value });

    setErrors({
      ...errors,
      [name]: fieldErrors[name] || ''
    });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }


    console.log("data : ", formData)
    
    try {
      const response = await fetch('https://votre-api-externe.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
          <Link href='/' className='flex justify-center items-center mbe-6'>
            <Logo />
          </Link>
          <div className='flex flex-col gap-5'>
            <div>
              <Typography variant='h4'>{`Bienvenue sur ${themeConfig.templateName}! 👋🏻`}</Typography>
              <Typography className='mbs-1'>Connectez-vous à votre compte...</Typography>
            </div>
            <Form autoComplete='off' className='flex flex-col gap-5' onSubmit={handleSubmit}>
              {/* <TextField autoFocus fullWidth label='Email' /> */}
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
                id='outlined-adornment-password'
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
              <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                <FormControlLabel control={<Checkbox />} label='Remember me' />
                <Typography className='text-end' color='primary' component={Link} href='/forgot-password'>
                  Mot de passe oublié?
                </Typography>
              </div>
              <Button fullWidth variant='contained' type='submit'>
                Log In
              </Button>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>Nouveau sur la plateforme?</Typography>
                <Typography component={Link} href='/register' color='primary'>
                  Créer un compte
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

export default Login
