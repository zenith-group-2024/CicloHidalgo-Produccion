import { useContext } from 'react';
import { GlobalContext } from '../../src/global/GlobalState';

export const useUpdateUser = () => {
    const { state } = useContext(GlobalContext);
    const updateUserData = async (updatedData) => {
        console.log(state.id)
        try {
            if (!state.id) {
                throw new Error('ID de usuario no disponible');
            }
            
            const response = await fetch(`https://darkslategrey-marten-184177.hostingersite.com/api/user/update/${state.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar los datos del usuario');
            }

            const data = await response.json();
            console.log('Datos actualizados:', data);
            return data;
        } catch (error) {
            console.error('Error al actualizar los datos:', error);
            throw error;
        }
    };

    return updateUserData;
};