/* eslint-disable no-useless-catch */
import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080/v1/',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            console.error('Error en la respuesta:', error.response.data);
        } else if (error.request) {
            console.error('No se recibió respuesta del servidor');
        } else {
            console.error('Error al configurar la petición:', error.message);
        }
        return Promise.reject(error);
    }
);

export const apiService = {
    // GET - Obtener todos los registros de una entidad
    getAll: async (endpoint) => {
        try {
            const response = await api.get(endpoint);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // GET - Obtener un registro por su ID
    getById: async (endpoint, id) => {
        try {
            const response = await api.get(`${endpoint}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // POST - Crear un nuevo registro
    create: async (endpoint, data) => {
        try {
            const response = await api.post(endpoint, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // PUT - Actualizar un registro existente
    update: async (endpoint, data) => {
        try {
            const response = await api.patch(endpoint, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // DELETE - Eliminar un registro
    delete: async (endpoint, id) => {
        try {
            await api.delete(`${endpoint}/${id}`);
            return true;
        } catch (error) {
            throw error;
        }
    },

    // PATCH - Actualizar parcialmente un registro
    patch: async (endpoint, id, data) => {
        try {
            const response = await api.patch(`${endpoint}/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Método para búsquedas
    search: async (endpoint, query) => {
        try {
            const response = await api.get(`${endpoint}`, { params: query });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default { api, apiService };