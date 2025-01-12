/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { apiService } from '../../services/ApiService';


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('El nombre es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres'),
    phone: Yup.string()
        .required('El teléfono es requerido')
        .matches(/^[0-9]+$/, 'El teléfono debe contener solo números')
        .min(10, 'El teléfono debe tener al menos 10 dígitos')
});

const UserForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [initialValues, setInitialValues] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        role: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchUser();
        }
    }, [id]);

    const fetchUser = async () => {
        try {
            const response = await apiService.getById('/users/get-id/', id);
            setInitialValues({
                name: response.name || '',
                email: response.email || '',
                phone: response.phone || '',
                address: response.address || '',
                role: response.role || '',

            });
        } catch (err) {
            setError('Error al cargar el usuario');
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setLoading(true);
            if (id) {
                await apiService.update('/users/'.concat(id), values);
            } else {
                await apiService.create('/users', values);
            }
            navigate('/users');
        } catch (err) {
            setError('Error al guardar el usuario');
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container">
            <h2>{id ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
            <div className="row">
                <div className="col-md-6">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nombre</label>
                                    <Field
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Ingrese el nombre"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Contraseña</label>
                                    <Field
                                        type="text"
                                        name="password"
                                        className="form-control"
                                        placeholder="Ingrese la contraseña"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Correo Electrónico</label>
                                    <Field
                                        type="text"
                                        name="email"
                                        className="form-control"
                                        placeholder="Ingrese el correo"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Teléfono</label>
                                    <Field
                                        type="text"
                                        name="phone"
                                        className="form-control"
                                        placeholder="Ingrese el teléfono"
                                    />
                                    <ErrorMessage
                                        name="phone"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Dirección</label>
                                    <Field
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        placeholder="Ingrese la dirección"
                                    />
                                    <ErrorMessage
                                        name="address"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Rol</label>
                                    <Field
                                        type="text"
                                        name="role"
                                        className="form-control"
                                        placeholder="Ingrese el Rol"
                                    />
                                    <ErrorMessage
                                        name="role"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                <div className="mb-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary me-2"
                                        disabled={isSubmitting || loading}
                                    >
                                        {loading ? 'Guardando...' : 'Guardar'}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate('/users')}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default UserForm;