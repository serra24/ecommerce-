import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const OfflineDetector = ({children}) => {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    useEffect(() => {
        const handleOffline = () => {
            setIsOffline(true);
        };

        const handleOnline = () => {
            setIsOffline(false);
        };

        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, []);

    useEffect(() => {
        const handleInteraction = () => {
            if (isOffline) {
                toast.error("Check your Network ")
            }
        };

        if (isOffline) {
            window.addEventListener('click', handleInteraction);
            window.addEventListener('keydown', handleInteraction);
            // You can add more event listeners for different interactions like mousemove, etc.
        }

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
            // Remove other event listeners if added
        };
    }, [isOffline]);
    return (
        <div>
            {children}
        </div>
    );
};

export default OfflineDetector;
