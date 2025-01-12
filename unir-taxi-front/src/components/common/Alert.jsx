/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const Alert = ({
    type = 'info',
    message,
    duration = 3000,
    onClose,
    isClosable = true
}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (duration && duration > 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                if (onClose) onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    if (!isVisible) return null;

    return (
        <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
            {message}
            {isClosable && (
                <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                        setIsVisible(false);
                        if (onClose) onClose();
                    }}
                />
            )}
        </div>
    );
};

export default Alert;