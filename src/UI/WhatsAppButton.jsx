import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = ({ message }) => {
    const phoneNumber = '50683158021'; 

    const generateWhatsAppLink = () => {
        const timestamp = new Date().getTime(); 
        return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}&timestamp=${timestamp}`;
    };

    return (
        <a
            href={generateWhatsAppLink()}
            className="fixed bottom-6 right-6 z-50"
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="w-16 h-16 flex items-center justify-center bg-green-500 text-white rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110">
                <MessageCircle className="w-8 h-8" />
            </div>
        </a>
    );
};

export default WhatsAppButton;