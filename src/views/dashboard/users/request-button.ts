import axios from 'axios';

export const deleteUser = async (userId: string | number) => {
  try {
    const response = await axios.delete(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// export const updateUserList = async () => {
//     try {
//       const updatedUsers = ; // Il faut écrire une fonction pour récupérer la liste mise à jour des utilisateurs
      
//     } catch (error) {
//       console.error('Error updating user list:', error);
//     }
//   };
  