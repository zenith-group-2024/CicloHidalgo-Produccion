
import { useState,useContext } from 'react';
import { GlobalContext } from '../../src/global/GlobalState.jsx';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useContext(GlobalContext);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://darkslategrey-marten-184177.hostingersite.com/api/user/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (response.ok) {
        const { token, user } = result;
        setToken(token, user.id, user.admin);
        return { token, userId: user.id, admin: user.admin}; 
      } else {
        throw new Error(result.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      console.log(error);
      throw error;  
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, login }; 
};