// MUI Imports
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { VerticalMenuContextProps } from '@/menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@/menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@/menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@/menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@/core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@/core/styles/vertical/menuSectionStyles'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }: { scrollMenu: (container: any, isPerfectScrollbar: boolean) => void }) => {
  // Hooks
  const theme = useTheme()
  const { isBreakpointReached, transitionDuration } = useVerticalNav()

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        menuItemStyles={menuItemStyles(theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(theme)}
      >

        <MenuSection label=''>
        
          <MenuItem href='/'>
            <i className='ri-home-smile-line' />
            <span>Tableau de Bord</span>
          </MenuItem>

        </MenuSection>

        <MenuSection label=''>
        
          <MenuItem href='/users'>
            <i className='ri-shield-keyhole-line' />
            <span>Utilisateur</span>
          </MenuItem>
          
        </MenuSection>
        
        <MenuSection label=''>
        
          <MenuItem href='/cultures'>
            <i className='ri-leaf-fill' />
            <span>Culture</span>
          </MenuItem>
          
        </MenuSection>

        <MenuSection label=''>
        
          <MenuItem href='/capteurs'>
            <i className='ri-shield-keyhole-line' />
            <span>Capteurs et Actionneurs</span>
          </MenuItem>
          
        </MenuSection>

        <MenuSection label=''>
        
          <MenuItem href='/tanques'>
            <i className='ri-shield-keyhole-line' />
            <span>Tanques</span>
          </MenuItem>
          
        </MenuSection>

        <MenuSection label=''>
        
          <MenuItem href='/logs'>
            <i className='ri-shield-keyhole-line' />
            <span>Logs</span>
          </MenuItem>
        
        </MenuSection>

      </Menu>
    </ScrollWrapper>

  )
}

export default VerticalMenu
