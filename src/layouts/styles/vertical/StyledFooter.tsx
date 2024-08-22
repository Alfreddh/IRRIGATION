import styled from "@emotion/styled/macro";
import type { CSSObject } from "@emotion/styled/macro";

// Config Imports
import themeConfig from '@/configs/themeConfig'

// Util Imports
import { verticalLayoutClasses } from '@/layouts/utils/layoutClasses'
type StyledFooterProps = {
    overrideStyles?: CSSObject
}

const StyledFooter = styled.footer<StyledFooterProps>`
  margin-inline: auto;
  max-inline-size: ${themeConfig.compactContentWidth}px;

  & .${verticalLayoutClasses.footerContentWrapper} {
    padding-block: 15px;
    padding-inline: ${themeConfig.layoutPadding}px;
  }

  ${({ overrideStyles }) => overrideStyles}
`

export default StyledFooter