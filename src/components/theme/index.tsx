// 'use client'

// // // React Imports
// // import { useMemo } from 'react'

// // // MUI Imports
// // // import { deepmerge } from '@mui/utils'
//  import {
//    Experimental_CssVarsProvider as CssVarsProvider,
//    experimental_extendTheme as extendTheme,
//    lighten,
//    darken
//  } from '@mui/material/styles'
// // import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
// // import CssBaseline from '@mui/material/CssBaseline'
// // import type {} from '@mui/material/themeCssVarsAugmentation' //! Do not remove this import otherwise you will get type errors while making a production build
// // import type {} from '@mui/lab/themeAugmentation' //! Do not remove this import otherwise you will get type errors while making a production build

// // // Type Imports

// // import type { ChildrenType, Direction } from '@/core/types'

// // // Component Imports
// // import ModeChanger from './ModeChanger'

// // // Config Imports
// // import themeConfig from '@/configs/themeConfig'
// // import primaryColorConfig from '@/configs/primaryColorConfig'

// // // Hook Imports
// // import { useSettings } from '@/core/hooks/useSettings'

// // // // Core Theme Imports
// // // import defaultCoreTheme from '@core/theme'

// // type Props = ChildrenType & {
// //   direction: Direction
// // }

// // const ThemeProvider = (props: Props) => {
// //   // Props
// //   const { children, direction } = props

// //   // Hooks
// //   const { settings } = useSettings()

// //   // Merge the primary color scheme override with the core theme
// //   const theme = useMemo(() => {
// //     const newColorScheme = {
// //       colorSchemes: {
// //         light: {
// //           palette: {
// //             primary: {
// //               main: primaryColorConfig[0].main,
// //               light: lighten(primaryColorConfig[0].main as string, 0.2),
// //               dark: darken(primaryColorConfig[0].main as string, 0.1)
// //             }
// //           }
// //         },
// //         dark: {
// //           palette: {
// //             primary: {
// //               main: primaryColorConfig[0].main,
// //               light: lighten(primaryColorConfig[0].main as string, 0.2),
// //               dark: darken(primaryColorConfig[0].main as string, 0.1)
// //             }
// //           }
// //         }
// //       }, 

// //       typography: {
// //         fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
// //       },
// //     }

// //     // const coreTheme = deepmerge(defaultCoreTheme(settings.mode || 'light', direction), newColorScheme)

// //     // return extendTheme(coreTheme)
// //     return newColorScheme

// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [settings.mode])

// //   return (
// //     <AppRouterCacheProvider options={{ prepend: true }}>
// //       <CssVarsProvider
// //         theme={theme}
// //         defaultMode={settings.mode}
// //         modeStorageKey={`${themeConfig.templateName.toLowerCase().split(' ').join('-')}-mui-template-mode`}
// //       >
// //         <>
// //           <ModeChanger />
// //           <CssBaseline />
// //           {children}
// //         </>
// //       </CssVarsProvider>
// //     </AppRouterCacheProvider>
// //   )
// // }

// // export default ThemeProvider



// import { useState, useMemo } from 'react'
// import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'
// import CssBaseline from '@mui/material/CssBaseline'
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'

// // Type Imports
// import type { ChildrenType } from '@/core/types'

// type Props = ChildrenType

// const ThemeProvider = ({ children }: Props) => {
//   const [mode, setMode] = useState<'light' | 'dark'>('light')

//   const theme = useMemo(() => createTheme({
//     palette: {
//       mode,
//     },
//   }), [mode])

//   return (
//     <AppRouterCacheProvider options={{ prepend: true }}>
//       <CssVarsProvider>
//         <MuiThemeProvider theme={theme}>
//           <CssBaseline />
//           {children}
//         </MuiThemeProvider>
//         </CssVarsProvider>
//     </AppRouterCacheProvider>
//   )
// }

// export default ThemeProvider


'use client'

// React Imports
import { useMemo } from 'react'

// MUI Imports
 import {
   Experimental_CssVarsProvider as CssVarsProvider,
   experimental_extendTheme as extendTheme,
   lighten,
   darken
 } from '@mui/material/styles'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import CssBaseline from '@mui/material/CssBaseline'

// Type Imports
import type { ChildrenType, Direction } from '@/core/types'

// Hook Imports
import { useSettings } from '@/core/hooks/useSettings'

type Props = ChildrenType & {
  direction: Direction
}

const ThemeProvider = (props: Props) => {
  // Props
  const { children, direction } = props

  // Hooks
  const { settings } = useSettings()

  return (
    <AppRouterCacheProvider options={{ prepend: true }}>
      <CssVarsProvider defaultMode={settings.mode}>
        <>
          <CssBaseline />
          {children}
        </>
      </CssVarsProvider>
    </AppRouterCacheProvider>
  )
}

export default ThemeProvider
