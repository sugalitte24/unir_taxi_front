import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { apiService } from '../../services/ApiService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Alert from '../../components/common/Alert';

const DriversList = () => {
    const { data, loading, error, refetch } = useFetch('driver');

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este conductor?')) {
            try {
                await apiService.delete('driver', id);
                refetch();
            } catch (err) {
                console.error('Error al eliminar el conductor:', err);
            }
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await apiService.patch('driver', id, { status: newStatus });
            refetch();
        } catch (err) {
            console.error('Error al cambiar el estado del conductor:', err);
        }
    };

    const drivers = data || [];

    if (loading) {
        return (
            <div className="container">
                <LoadingSpinner message="Cargando conductores..." />
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
                <h2>Lista de Conductores</h2>
                <Link to="/drivers/new" className="btn btn-primary">
                    Nuevo Conductor
                </Link>
            </div>

            {drivers.length === 0 ? (
                <div className="alert alert-info">
                    No hay conductores registrados.
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Licencia</th>
                                <th>Placa Vehiculo</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drivers.map(driver => (
                                <tr key={driver.uuid}>
                                    <td>{driver.licenceNumber}</td>
                                    <td>{driver.vehiclePlate}</td>
                                    <td>
                                        <span className={`badge bg-${{
                                            pending: 'warning',
                                            approved: 'success',
                                            rejected: 'danger',
                                            active: 'primary',
                                            enabled: 'secondary'
                                        }[driver.status] || 'secondary'
                                            }`}>
                                            {driver.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="btn-group">
                                            <Link
                                                to={`/drivers/edit/${driver.uuid}`}
                                                className="btn btn-sm btn-outline-primary"
                                            >
                                                Editar
                                            </Link>
                                            {driver.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusChange(driver.uuid, 'approved')}
                                                        className="btn btn-sm btn-outline-success"
                                                    >
                                                        Aprobar
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(driver.uuid, 'rejected')}
                                                        className="btn btn-sm btn-outline-danger"
                                                    >
                                                        Rechazar
                                                    </button>
                                                </>
                                            )}
                                            {driver.status === 'approved' && (
                                                <button
                                                    onClick={() => handleStatusChange(driver.uuid, 'active')}
                                                    className="btn btn-sm btn-outline-primary"
                                                >
                                                    Activar
                                                </button>
                                            )}
                                            {driver.status === 'active' && (
                                                <button
                                                    onClick={() => handleStatusChange(driver.uuid, 'enabled')}
                                                    className="btn btn-sm btn-outline-secondary"
                                                >
                                                    Desactivar
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(driver.uuid)}
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

export default DriversList;