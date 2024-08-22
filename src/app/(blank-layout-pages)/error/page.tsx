// Component Imports
import NotFound from '@/views/NotFound'

// Server Action Imports
import { getSystemMode } from '@/core/utils/serverHelpers'

const Error = () => {
  // Vars
  const mode = getSystemMode()

  return <NotFound mode={mode} />
}

export default Error
