import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/ApiService';


const Home = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalDrivers: 0,
        pendingDrivers: 0,
        activeDrivers: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStatistics();
    }, []);

    const fetchStatistics = async () => {
        try {
            const [users, drivers] = await Promise.all([
                apiService.getAll('/users'),
                apiService.getAll('/driver')
            ]);

            const driversData = drivers;
            setStats({
                totalUsers: users.length,
                totalDrivers: driversData.length,
                pendingDrivers: driversData.filter(d => d.status === 'pending').length,
                activeDrivers: driversData.filter(d => d.status === 'active').length
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching statistics:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="jumbotron bg-light p-5 rounded">
                <h1 className="display-4">Sistema de Gestión de Conductores</h1>
                <p className="lead">
                    Bienvenido al sistema de gestión de usuarios y conductores.
                </p>
                <hr className="my-4" />
            </div>

            <div className="row mt-4">
                <div className="col-md-3">
                    <div className="card text-white bg-primary mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Total Usuarios</h5>
                            <p className="card-text display-6">{stats.totalUsers}</p>
                            <Link to="/users" className="btn btn-light btn-sm">
                                Ver usuarios
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Total Conductores</h5>
                            <p className="card-text display-6">{stats.totalDrivers}</p>
                            <Link to="/drivers" className="btn btn-light btn-sm">
                                Ver conductores
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-white bg-warning mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Conductores Pendientes</h5>
                            <p className="card-text display-6">{stats.pendingDrivers}</p>
                            <Link to="/drivers?status=pending" className="btn btn-light btn-sm">
                                Ver pendientes
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-white bg-info mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Conductores Activos</h5>
                            <p className="card-text display-6">{stats.activeDrivers}</p>
                            <Link to="/drivers?status=active" className="btn btn-light btn-sm">
                                Ver activos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            Acciones Rápidas
                        </div>
                        <div className="card-body">
                            <div className="d-grid gap-2">
                                <Link to="/users/new" className="btn btn-outline-primary">
                                    Registrar Nuevo Usuario
                                </Link>
                                <Link to="/drivers/new" className="btn btn-outline-success">
                                    Registrar Nuevo Conductor
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;