import React, { createContext, useState, useEffect } from 'react';


export const CartContext = createContext();


export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);

            if (existingProduct) {
                const newQuantity = existingProduct.quantity + 1;

                if (newQuantity > product.cantidad) {
                    setMessage('Producto agotado');
                    setShowMessage(true);

                    setTimeout(() => {
                        setShowMessage(false);
                        setMessage('');
                    }, 2000);

                    return prevCart;
                }

                setMessage('Producto agregado al carrito!');
                setShowMessage(true);
        
                setTimeout(() => {
                    setShowMessage(false);
                    setMessage('');
                }, 2000);

                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {

                if (product.cantidad < 1 ){
                    return prevCart;
                }
                setMessage('Producto agregado al carrito!');
                setShowMessage(true);
        
                setTimeout(() => {
                    setShowMessage(false);
                    setMessage('');
                }, 2000);

                return [...prevCart, { ...product, quantity: 1 }];
            }
        });

    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };
    
    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, message, showMessage, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
