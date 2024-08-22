'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'

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

import { Mode } from '@/core/types'

import { useImageVariant } from '@/core/hooks/useImageVariant'

const Register = ({ mode }: { mode: Mode }) => {
    // States
    const [isPasswordShown, setIsPasswordShown] = useState(false)
    
    // Vars
    const darkImg = '/images/pages/auth-v1-mask-dark.png'
    const lightImg = '/images/pages/auth-v1-mask-light.png'

    // Hooks
    const authBackground = useImageVariant(mode, lightImg, darkImg)

    const handleClickShowPassword = () => setIsPasswordShown(show => !show)

    // return(
    //     <div className="flex flex-col justify-center items-center">

    //     </div>
    // )

    return(
        <div 
          className="flex flex-col justify-center items-center"
          style={{ backgroundImage: `url(${authBackground})`, backgroundSize: 'cover' }} // Application de l'image en arrière-plan
        >
            <h1 className="text-3xl font-bold mb-6">Register</h1>
            <form className="w-full max-w-sm">
                {/* Vos champs de formulaire ici */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={isPasswordShown ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <button
                            type="button"
                            onClick={handleClickShowPassword}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        >
                            {isPasswordShown ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )

  
  }
  
  export default Register