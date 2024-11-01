import React from 'react';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';

const SocialMediaSection = () => {
    return (
        <section className="py-16 bg-gray-100 mt-10">
            <div className="container mx-auto px-4">
                <div className="flex justify-center space-x-6">
                   
                    <a href="https://wa.me/50683158021" target="_blank" rel="noopener noreferrer">
                        <MessageCircle
                            size={50} 
                            className="text-blue transition-transform transform hover:scale-125" 
                            aria-label="WhatsApp"
                        />
                    </a>

                    
                    <a href="https://www.facebook.com/share/R88QGPERJMBBC1QS/?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
                        <Facebook 
                            size={50} 
                            className="text-blue transition-transform transform hover:scale-125" 
                            aria-label="Facebook"
                        />


                        
                    </a>

                    
                    <a href="https://www.instagram.com/ciclo_hidalgo?igsh=aDV3b2NpcWQ1eWpn" target="_blank" rel="noopener noreferrer">
                        <Instagram 
                            size={50} 
                            className="text-blue transition-transform transform hover:scale-125" 
                            aria-label="Instagram"
                        />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default SocialMediaSection;
