'use client'

import classnames from "classnames"
import type { CSSObject } from "@emotion/styled"

// Type imports
import type { ChildrenType } from '@/core/types'

// Util Imports
import { verticalLayoutClasses } from '@/layouts/utils/layoutClasses'

// Styled Component Imports
import StyledFooter from "../styles/vertical/StyledFooter"

type Props = ChildrenType & {
    overrideStyles?: CSSObject
}

const Footer = (props : Props) => {
    // Props

    const { children, overrideStyles } = props

    return (
        <StyledFooter
          overrideStyles={overrideStyles}
          className={classnames(
            verticalLayoutClasses.footer,
            verticalLayoutClasses.footerContentCompact,
            verticalLayoutClasses.footerStatic,
            verticalLayoutClasses.footerDetached,
            'is-full'
          )}
        >
          <div className={verticalLayoutClasses.footerContentWrapper}>{children}</div>
        </StyledFooter>
      )
}

export default Footer