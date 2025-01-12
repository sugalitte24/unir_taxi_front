import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { apiService } from '../../services/ApiService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Alert from '../../components/common/Alert';

const UsersList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data, loading, error, refetch } = useFetch('users');

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este usuario?')) {
            try {
                await apiService.delete('users', id);
                refetch();
            } catch (err) {
                console.error('Error al eliminar el usuario:', err);
            }
        }
    };

    const users = data || [];

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="container">
                <LoadingSpinner message="Cargando usuarios..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <Alert
                    type="danger"
                    message={error}
                />
            </div>
        );
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Lista de Usuarios</h2>
                <Link to="/users/new" className="btn btn-primary">
                    Nuevo Usuario
                </Link>
            </div>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por nombre o teléfono..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {users.length === 0 ? (
                <div className="alert alert-info">
                    No hay usuarios registrados.
                </div>
            ) : filteredUsers.length === 0 ? (
                <div className="alert alert-warning">
                    No se encontraron usuarios con el término de búsqueda &quot;{searchTerm}&quot;
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo Electronico</th>
                                <th>Teléfono</th>
                                <th>Dirección</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.uuid}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <div className="btn-group">
                                            <Link
                                                to={`/users/edit/${user.uuid}`}
                                                className="btn btn-sm btn-outline-primary"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(user.uuid)}
                                                className="btn btn-sm btn-outline-danger"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UsersList;