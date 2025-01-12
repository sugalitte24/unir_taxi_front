/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiService } from '../../services/ApiService';
import UserSelector from '../../components/common/SelectorUser';

const DriverForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        licenseNumber: '',
        licenceNumber: '',
        status: 'pending',
        userUuid: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchDriver();
        }
    }, [id]);

    const fetchDriver = async () => {
        try {
            setLoading(true);
            const driverData = await apiService.getById('driver', id);
            setFormData({
                name: driverData.name || '',
                licenceNumber: driverData.licenceNumber || '',
                vehiclePlate: driverData.vehiclePlate || '',
                status: driverData.status || 'pending',
                userUuid: driverData.userUuid || ''
            });
        } catch (err) {
            setError('Error al cargar el conductor');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUserSelect = (userUuid) => {
        setFormData(prev => ({
            ...prev,
            userUuid
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.userUuid) {
            setError('Debe seleccionar un usuario');
            return;
        }

        try {
            setLoading(true);
            if (id) {
                await apiService.update('driver', id, formData);
            } else {
                await apiService.create('driver', formData);
            }
            navigate('/drivers');
        } catch (err) {
            setError('Error al guardar el conductor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>{id ? 'Editar Conductor' : 'Nuevo Conductor'}</h2>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="userUuid" className="form-label">Usuario Asociado</label>
                    <UserSelector
                        value={formData.userUuid}
                        onChange={handleUserSelect}
                        disabled={loading}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="licenceNumber" className="form-label">Número de Licencia</label>
                    <input
                        type="text"
                        className="form-control"
                        id="licenceNumber"
                        name="licenceNumber"
                        value={formData.licenceNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="vehiclePlate" className="form-label">Placa Vehículo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="vehiclePlate"
                        name="vehiclePlate"
                        value={formData.vehiclePlate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Estado</label>
                    <select
                        className="form-select"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="pending">Pendiente</option>
                        <option value="approved">Aprobado</option>
                        <option value="rejected">Rechazado</option>
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                    </select>
                </div>

                <div className="mb-3">
                    <button
                        type="submit"
                        className="btn btn-primary me-2"
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : 'Guardar'}
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/drivers')}
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DriverForm;