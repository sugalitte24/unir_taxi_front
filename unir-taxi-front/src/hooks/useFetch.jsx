import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/ApiService';

const useFetch = (endpoint = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await apiService.getAll(endpoint);
            setData(response || []);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err?.response?.data?.message || 'Error al cargar los datos');
            setData([]);
        } finally {
            setLoading(false);
        }
    }, [endpoint]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refetch = useCallback(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        loading,
        error,
        refetch,
        setData
    };
};

export default useFetch;