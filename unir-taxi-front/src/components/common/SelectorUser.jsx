/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { apiService } from '../../services/ApiService';

const UserSelector = ({ value, onChange, className = '', disabled = false }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await apiService.getAll('users');
            setUsers(response || []);
        } catch (err) {
            setError('Error al cargar los usuarios');
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <select className={`form-select ${className}`} disabled>
            <option>Cargando usuarios...</option>
        </select>
    );

    if (error) return (
        <div>
            <select className={`form-select ${className}`} disabled>
                <option>Error al cargar usuarios</option>
            </select>
            <small className="text-danger">{error}</small>
        </div>
    );

    return (
        <div>
            <select
                className={`form-select ${className}`}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
            >
                <option value="">Seleccione un usuario</option>
                {filteredUsers.map(user => (
                    <option key={user.uuid} value={user.uuid}>
                        {user.name}
                    </option>
                ))}
            </select>
            {filteredUsers.length === 0 && searchTerm && (
                <small className="text-muted">
                    No se encontraron usuarios con &quot;{searchTerm}&quot;
                </small>
            )}
        </div>
    );
};

export default UserSelector;