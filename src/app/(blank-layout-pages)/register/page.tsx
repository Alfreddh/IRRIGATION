// Component Imports 
import Register from "@/views/Register";

//Server Action Imports 
import { getSystemMode } from "@/core/utils/serverHelpers";


const RegisterPage = () => {
    // Vars 
    const mode = getSystemMode()
    return <Register mode={mode}/>
}

export default RegisterPage


