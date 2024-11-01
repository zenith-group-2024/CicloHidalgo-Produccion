import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../src/global/GlobalState';

const FetchUser = () => {
    const { state } = useContext(GlobalContext);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUserData = async () => {
            if (state.id) { 
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/user/${state.id}`, {
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
