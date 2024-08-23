'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
// import useVerticalNav from '@/menu/hooks/useVerticalNav'

// Util Imports
import { verticalLayoutClasses } from '@/layouts/utils/layoutClasses'

const FooterContent = () => {
  // Hooks
  // const { isBreakpointReached } = useVerticalNav()

  return (
    <div
      className={classnames(verticalLayoutClasses.footerContent, 'flex items-center justify-center flex-wrap gap-4')}
    >
      <p>
        <span className='font-extrabold text-gray-400'> Copyright </span>
        <span className='font-extrabold text-gray-400'>{`© ${new Date().getFullYear()}`}</span>
        <Link href='https://green-tech-innovation.com' target='_blank' className='font-extrabold text-blue-600 ml-1.5'>
          Green Tech Innovation  
        </Link>
        <span className="ml-1 font-semibold text-gray-400"> Tous droits réservés. </span>

      </p>
      {/* {!isBreakpointReached && (
        <div className='flex items-center gap-4'>
          <Link href='https://themeselection.com/license' target='_blank' className='text-primary'>
            License
          </Link>
          <Link href='https://themeselection.com' target='_blank' className='text-primary'>
            More Themes
          </Link>
          <Link href={process.env.NEXT_PUBLIC_DOCS_URL as string} target='_blank' className='text-primary'>
            Documentation
          </Link>
          <Link
            href={`https://green-tech-innovation.com`}
            target='_blank'
            className='text-primary'
          >
            Support
          </Link>
        </div>
      )} */}
    </div>
  )
}

export default FooterContent
