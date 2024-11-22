import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../src/global/GlobalState';

const FetchUser = () => {
    const { state } = useContext(GlobalContext);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (state.id) { 
                try {
                    const response = await fetch(`https://darkslategrey-marten-184177.hostingersite.com/api/user/${state.id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('authToken')}`, 
                            'Accept': 'application/json',
                        },
                    });
                    const data = await response.json();
                   
                    setFormData(data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };
    
        fetchUserData();
    }, [state.id]);
    
    return { formData, loading };
};

export default FetchUser;