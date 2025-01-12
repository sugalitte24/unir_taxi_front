/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import apiDrivers from './../../services/DriversApi'


const DriverDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [driver, setDriver] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const statusLabels = {
        pending: { text: 'Pendiente', class: 'warning' },
        approved: { text: 'Aprobado', class: 'success' },
        rejected: { text: 'Rechazado', class: 'danger' },
        active: { text: 'Activo', class: 'primary' },
        inactive: { text: 'Inactivo', class: 'secondary' }
    };

    useEffect(() => {
        fetchDriver();
    }, [id]);

    const fetchDriver = async () => {
        try {
            const response = await apiDrivers.get(`/drivers/${id}`);
            setDriver(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar los datos del conductor');
            setLoading(false);
        }
    };

    const handleStatusChange = async (newStatus) => {
        try {
            await apiDrivers.patch(`/drivers/${id}`, { status: newStatus });
            setDriver({ ...driver, status: newStatus });
        } catch (err) {
            setError('Error al actualizar el estado del conductor');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('¿Está seguro de eliminar este conductor?')) {
            try {
                await apiDrivers.delete(`/drivers/${id}`);
                navigate('/drivers');
            } catch (err) {
                setError('Error al eliminar el conductor');
            }
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="alert alert-danger" role="alert">
            {error}
        </div>
    );

    if (!driver) return (
        <div className="alert alert-info" role="alert">
            No se encontró el conductor
        </div>
    );

    return (
        <div className="container py-4">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">Detalles del Conductor</h3>
                    <div className="btn-group">
                        <Link
                            to={`/drivers/edit/${id}`}
                            className="btn btn-primary btn-sm"
                        >
                            Editar
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="btn btn-danger btn-sm"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="card-title">Información Personal</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <strong>Nombre:</strong> {driver.name}
                                </li>
                                <li className="list-group-item">
                                    <strong>Email:</strong> {driver.email}
                                </li>
                                <li className="list-group-item">
                                    <strong>Teléfono:</strong> {driver.phone}
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-6">
                            <h5 className="card-title">Información de Licencia</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <strong>Número de Licencia:</strong> {driver.licenseNumber}
                                </li>
                                <li className="list-group-item">
                                    <strong>Estado:</strong>{' '}
                                    <span className={`badge bg-${statusLabels[driver.status]?.class}`}>
                                        {statusLabels[driver.status]?.text}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {driver.status === 'pending' && (
                        <div className="mt-4">
                            <h5>Acciones</h5>
                            <div className="btn-group">
                                <button
                                    onClick={() => handleStatusChange('approved')}
                                    className="btn btn-success"
                                >
                                    Aprobar Conductor
                                </button>
                                <button
                                    onClick={() => handleStatusChange('rejected')}
                                    className="btn btn-danger"
                                >
                                    Rechazar Conductor
                                </button>
                            </div>
                        </div>
                    )}

                    {driver.status === 'approved' && (
                        <div className="mt-4">
                            <h5>Acciones</h5>
                            <div className="btn-group">
                                <button
                                    onClick={() => handleStatusChange('active')}
                                    className="btn btn-primary"
                                >
                                    Activar Conductor
                                </button>
                                <button
                                    onClick={() => handleStatusChange('inactive')}
                                    className="btn btn-secondary"
                                >
                                    Desactivar Conductor
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="card-footer">
                    <Link to="/drivers" className="btn btn-outline-secondary">
                        Volver a la lista
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DriverDetails;