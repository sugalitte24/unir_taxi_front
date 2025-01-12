/* eslint-disable react/prop-types */

const LoadingSpinner = ({ size = "medium", message = "Cargando..." }) => {
    const spinnerSize = {
        small: "",
        medium: "spinner-border-sm",
        large: "spinner-border"
    };

    return (
        <div className="text-center p-3">
            <div className={`spinner-border text-primary ${spinnerSize[size]}`} role="status">
                <span className="visually-hidden">{message}</span>
            </div>
            {message && <p className="mt-2">{message}</p>}
        </div>
    );
};

export default LoadingSpinner;