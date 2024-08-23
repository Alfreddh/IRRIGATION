'use client'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

// Type Imports
import type { Mode } from '@/core/types'

// Component Imports
import Form from '@/components/Form'
import DirectionalIcon from '@/components/DirectionalIcon'
// import Illustrations from '@/components/Illustrations'
import Logo from '@/components/layout/shared/Logo'

// Hook Imports
import { useImageVariant } from '@/core/hooks/useImageVariant'
import InputAdornment from '@mui/material/InputAdornment'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { validateForm } from './Validations/forgot-password'

const ForgotPassword = ({ mode }: { mode: Mode }) => {
  // Vars
  // const darkImg = '/images/pages/auth-v1-mask-dark.png'
  // const lightImg = '/images/pages/auth-v1-mask-light.png'

  // Hooks
  // const authBackground = useImageVariant(mode, lightImg, darkImg)
  const router = useRouter()

  // Etats pour gérer les valeurs des champs du formulaire
  const [formData, setformData] = useState({
    phone: '',
  });
  

  const [errors, setErrors] = useState({
    phone: '',
  });

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
          <Typography variant='h4'>Mot de passe oublié ? 🔒</Typography>
          <div className='flex flex-col gap-5'>
            <Typography className='mbs-1'>
              Entrer votre numéro de téléphone et nous vous enverrons les instructions pour réinitialiser votre mot de passe...
            </Typography>
            <Form noValidate autoComplete='off' className='flex flex-col gap-5' onSubmit={handleSubmit}>
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
              <Button fullWidth variant='contained' type='submit'>
                Send reset link
              </Button>
              <Typography className='flex justify-center items-center' color='primary'>
                <Link href='/login' className='flex items-center'>
                  <DirectionalIcon ltrIconClass='ri-arrow-left-s-line' rtlIconClass='ri-arrow-right-s-line' />
                  <span>Revenir à "Se connecter"</span>
                </Link>
              </Typography>
            </Form>
          </div>
        </CardContent>
      </Card>
      {/* <Illustrations maskImg={{ src: authBackground }} /> */}
    </div>
  )
}

export default ForgotPassword
