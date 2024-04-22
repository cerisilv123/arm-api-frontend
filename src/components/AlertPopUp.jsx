import React, { useState, useEffect } from 'react';

function AlertPopUp({ message, isSuccess }) {
    console.log("AlertPopUp rendering", { message, isSuccess });

    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        // Timer to display the alert for 3 seconds before closing.
        const timer = setTimeout(() => {
            setIsOpen(false);
        }, 3000);

        // handles if component is unmounted before 3 seconds have passed.
        return () => clearTimeout(timer);
    }, []); 

    if (!isOpen) {
        return null; // Component will not be rendered to screen.
    }

    return (
        <div className={`fixed top-0 left-0 font-semibold right-0 w-full px-10 py-5 shadow-md border-b border-gray-300 ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}> 
            <p>{message}</p>
        </div>
    );
}

export default AlertPopUp;